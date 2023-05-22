const AppError = require("../utils/appError");
const conn = require("../services/db");
const addData = require("./addData");
const deleteData = require("./deleteData");
const updateDate = require("./updateData");
const access = require("./access");
const job = require("./jobs")


class Application {
    constructor(id, resume, coverLetter, jobId, userId) {
        this.id = id;
        this.resume = resume;
        this.coverLetter = coverLetter;
        this.jobId = jobId;
        this.userId = userId;
    }
}

exports.submitApplication = async (req, res, next) => {
    const application = new Application(
        req.body.id,
        req.body.resume,
        req.body.coverLetter,
        req.params.id,
        req.body.userId
    );
    if (await access.onlyId(req.body.userId, req, res, next) == true) {
        addData.addDataToTable(req, res, next, application);
    } else
        next(new AppError('Not authorized', 401));
};

exports.updateApplication = async (req, res, next) => {
    if (await access.onlyId(req.params.id, req, res, next) == true) {
        updateDate.updateTable(req, res, next, "applications");
    } else
        next(new AppError('Not authorized', 401));
};


exports.deleteApplication = async (req, res, next) => {

    if (await access.onlyId(req.params.userId, req, res, next) == true) {
        deleteData.deleteDataFromTable(req, res, next, "applications");
    } else
        next(new AppError('Not authorized', 401));
};

exports.getApplicationsForJob = async (req, res, next) => {

    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
    }

    const jobData = await job.getJobById(req.params.id);
    if (await access.onlyId(jobData.userId, req, res, next) == true) {
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
    } else
        next(new AppError('Not authorized', 401));
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

exports.getUserApplications = async (req, res, next) => {


    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }

    if (await access.onlyId(req.params.id, req, res, next) == true) {
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
    } else
        next(new AppError('Not authorized', 401));

}

exports.getUserApplicationsbyId = async (req, res, next) => {


    if (!req.params.userId) {
        return next(new AppError("No user id found", 404));
    }
    if (!req.params.applicationId) {
        return next(new AppError("No application id found", 404));
    }

    if (await access.onlyId(req.params.userId, req, res, next) == true) {
        conn.query(
            "SELECT * FROM applications WHERE userId = ? and id = ? ",
            [req.params.userId, req.params.applicationId],
            function (err, data, fields) {
                if (err) return next(new AppError(err, 500));
                res.status(200).json({
                    status: "success",
                    length: data?.length,
                    data: data,
                });
            }
        );
    } else
        next(new AppError('Not authorized', 401));
}