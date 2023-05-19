const AppError = require("../utils/appError");
const conn = require("../services/db");
const jwt = require('jsonwebtoken');

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

exports.addUser = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.id,
        req.body.name,
        req.body.password,
        req.body.birthdate,
        req.body.gender,
        req.body.email
    ];
    conn.query(
        "INSERT INTO jobs VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "Job added",
            });
        }
    );
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

exports.deleteUser = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "DELETE FROM jobs WHERE id = ?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user deleted",
            });
        }
    );
};


