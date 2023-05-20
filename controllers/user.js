const AppError = require("../utils/appError");
const conn = require("../services/db");
const addData = require("./addData");
const deleteData = require("./deleteData");
const jwt = require('jsonwebtoken');


class User {
    constructor(id, name, password, birthdate, gender, email) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.birthdate = birthdate;
        this.gender = gender;
        this.email = email;
    }
}

exports.addUser = (req, res, next) => {
    const user = new User(
        req.body.id,
        req.body.name,
        req.body.password,
        req.body.birthdate,
        req.body.gender,
        req.body.email
    );

    addData.addDataToTable(req, res, next, user);
};

exports.deleteUser = (req, res, next) => {
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




