const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.addJob = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.id,
        req.body.title,
        req.body.description,
        req.body.requirement,
        req.body.salaryMin,
        req.body.salaryMax,
        req.body.targetedPeople
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

exports.deleteJob = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
    }
    conn.query(
        "DELETE FROM jobs WHERE id = ?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "job deleted",
            });
        }
    );
};




