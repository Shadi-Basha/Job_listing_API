const AppError = require("../utils/appError");
const conn = require("../services/db");
const addData = require("./addData");
const deleteData = require("./deleteData");
const auth = require('./authentication');

class User {
    constructor(id, name, password, birthdate, gender, email) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.birthdate = birthdate;
        this.gender = gender;
        this.email = email;
    }

    static getUserByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const values = [email.email];
        return new Promise((resolve, reject) => {
            conn.query(sql, values, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data[0]);
                }
            });
        });
    }
}

exports.addUser = async (req, res, next) => {
    const thePassword = await auth.hashPassword(req.body.password);

    console.log(thePassword);
    const user = new User(
        req.body.id,
        req.body.name,
        thePassword,
        req.body.birthdate,
        req.body.gender,
        req.body.email
    );

    addData.addDataToTable(req, res, next, user);
};

exports.deleteUser = (req, res, next) => {
    const data = auth.authenticateToken(req, res, next);

    console.log("token data", data);

    if (data.userId != req.params.id && data.userId != 2001) {
        return res.status(401).json({
            status: "failed",
            message: 'access denied'
        });
    }

    deleteData.deleteDataFromTable(req, res, next, "users");
};

exports.showAllUsers = (req, res, next) => {
    conn.query("SELECT * FROM users",
        function (err, data, fields) {
            if (err) return next(new AppError(err))
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        });
};

exports.getUserById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "SELECT * FROM jobs WHERE id = ?",
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

        const user = await User.getUserByEmail({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        console.log(password + " " + user.password);

        const isPasswordValid = await auth.comparePasswords(
            password,
            user.password
        );

        // console.log(password.password + " " + user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = auth.generateToken(user.id);

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

