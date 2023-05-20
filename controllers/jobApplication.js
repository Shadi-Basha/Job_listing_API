const AppError = require("../utils/appError");
const conn = require("../services/db");
const addData = require("./addData");
const deleteData = require("./deleteData");
const updateDate = require("./updateData");

class Application {
    constructor(id, resume, coverLetter, jobId, userId) {
        this.id = id;
        this.resume = resume;
        this.coverLetter = coverLetter;
        this.jobId = jobId;
        this.userId = userId;
    }
}

exports.submitApplication = (req, res, next) => {
    const application = new Application(
        req.body.id,
        req.body.resume,
        req.body.coverLetter,
        req.params.id,
        req.body.userId
    );

    addData.addDataToTable(req, res, next, application);
};

exports.updateApplication = (req, res, next) => {
    updateDate.updateTable(req, res, next, "applications");
};


exports.deleteApplication = (req, res, next) => {
    deleteData.deleteDataFromTable(req, res, next, "applications");
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