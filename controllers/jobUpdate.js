const AppError = require("../utils/appError");
const conn = require("../services/db");


class jobUpdater {
    type;
    req;
    sql;
    values;
    message;

    constructor(type, req) {
        this.req = req;
        this.type = type;
        this.updateJob(type, req);
    }

    updateJob(type, req) {
        this.sql = "UPDATE jobs SET " + type + " = ? where id = ?";
        this.message = "job " + type + " updated";
        this.values = [req.body.data, req.params.id]
        // other solotion : name the data in the json
        // if (type == "title") {
        //     this.values = [req.body.job_title, req.params.id];
        // }
        // else if (type == "description") {
        //     this.values = [req.body.job_description, req.params.id];
        // }
        // else if (type == "requirement") {
        //     this.values = [req.body.job_requirement, req.params.id];
        // }
        // else if (type == "salary_min") {
        //     this.values = [req.body.job_salary_min, req.params.id];
        // }
        // else if (type == "salary_max") {
        //     this.values = [req.body.job_salary_max, req.params.id];
        // }
        // else if (type == "targeted_people") {
        //     this.values = [req.body.job_targeted_people, req.params.id];
        // }
    };
};

exports.updatejobs = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
        // error handling for the id that does not exist and make sure that the variable does exist.
    }
    jobUpdate = new jobUpdater(req.params.type, req);
    conn.query(
        jobUpdate.sql,
        jobUpdate.values,
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: jobUpdate.message,
            });
        }
    );
};