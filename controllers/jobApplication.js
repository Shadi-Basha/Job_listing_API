const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.submitApplication = (req, res, next) => {
    if (!req.body) return next(new AppError("No data found", 404));

    const values = [
        req.body.id,
        req.body.resume,
        req.body.coverLetter,
        req.params.id,
        req.body.userId
    ];
    conn.query(
        "INSERT INTO applications VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "application submitted",
            });
        }
    );
};

exports.getApplicationsForJob = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
    }
    conn.query(
        "SELECT * FROM applications WHERE jobId = ?",
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
}

exports.getApplicationById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No Application id found", 404));
    }
    conn.query(
        "SELECT * FROM applications WHERE id = ?",
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
}

exports.deleteApplication = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No application id found", 404));
    }
    conn.query(
        "DELETE FROM application WHERE id = ?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "application deleted",
            });
        }
    );
};

exports.getUserApplications = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "SELECT * FROM applications WHERE userId = ?",
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
}

exports.getUserApplicationsbyId = (req, res, next) => {
    if (!req.params.userId) {
        return next(new AppError("No user id found", 404));
    }
    if (!req.params.applicationId) {
        return next(new AppError("No application id found", 404));
    }
    conn.query(
        "SELECT * FROM applications WHERE userId = ? and id = ? ",
        [req.params.userId, applicationId],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
}