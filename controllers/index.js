const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getJobs = (req, res, next) => {
    conn.query("SELECT * FROM jobs", function (err, data, fields) {
        if (err) return next(new AppError(err))
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.addJob = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.job_id,
        req.body.job_title,
        req.body.job_description,
        req.body.job_salary_min,
        req.body.job_requirement,
        req.body.job_salary_max
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

exports.getJobsUsingId = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
    }
    conn.query(
        "SELECT * FROM jobs WHERE job_id = ?",
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

exports.updateJobTitle = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
    }
    conn.query(
        "UPDATE jobs SET job_title = ? where job_id = ?",
        [req.params.job_title, req.params.id],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "job title updated",
            });
        }
    );
};

exports.deleteJob = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
    }
    conn.query(
        "DELETE FROM jobs WHERE job_id = ?",
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
