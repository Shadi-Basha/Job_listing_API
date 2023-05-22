const AppError = require("../utils/appError");
const conn = require("../services/db");
const addData = require("./addData");
const deleteData = require("./deleteData");
const auth = require('./authentication');
const access = require("./access");
const emailChecker = require("../externalApi/emailChecker");
class User {
    constructor(id, name, password, birthdate, gender, email, type) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.birthdate = birthdate;
        this.gender = gender;
        this.email = email;
        this.type = type;
    }
}

exports.getUserByEmail = (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const values = [email];
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data[0]);
            }
        });
    });
};

exports.addUser = async (req, res, next) => {
    const thePassword = await auth.hashPassword(req.body.password);
    const user = new User(
        req.body.id,
        req.body.name,
        thePassword,
        req.body.birthdate,
        req.body.gender,
        req.body.email,
        req.body.type
    );
    
    const apiResponse = await emailChecker.checkEmail(req.body.email);
    if(apiResponse.valid == true){
        addData.addDataToTable(req, res, next, user);
    }
    else {
        next(new AppError('Email not valid', 401));
    }
};

exports.deleteUser = async (req, res, next) => {

    if (await access.onlyId(req.params.id, req, res, next) == true) {
        deleteData.deleteDataFromTable(req, res, next, "users");
    } else
        next(new AppError('Not authorized', 401));

};

exports.showAllUsers = async (req, res, next) => {
    if (await access.admin(req, res, next)) {
        conn.query("SELECT u.id, u.name, u.birthdate, u.gender, u.email, u.type FROM users u",
            function (err, data, fields) {
                if (err) return next(new AppError(err))
                res.status(200).json({
                    status: "success",
                    length: data?.length,
                    data: data,
                });
            });
    }
    else
        next(new AppError('Not authorized', 401));

};

exports.getUserById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "SELECT u.name, u.birthdate, u.gender, u.email, u.type FROM users u WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};


// logging

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        const user = await this.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await auth.comparePasswords(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = auth.generateToken(user.id, user.email);

        res.status(200).json({
            token,
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (err) {
        return next(err);
    }
};
