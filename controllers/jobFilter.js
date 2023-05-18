const AppError = require("../utils/appError");
const conn = require("../services/db");

function format(string) {
    return '"' + string + '"';
}

class jobFilter {
    sql;
    req;

    filterBuilding(req) {
        this.sql = "SELECT j.job_id,j.job_title,j.job_targeted_people,j.job_salary_min,j.job_salary_max FROM jobs j WHERE ";
        let filter = "";
        if (req.body.job_id) {
            filter += " job_id = " + format(req.body.job_id);
        }
        if (req.body.job_title) {
            filter += " job_title = " + format(req.body.job_title);
        }
        if (req.body.job_salary_max) {
            filter += " job_salary_max <= " + req.body.job_salary_max;
        }
        if (req.body.job_salary_min || req.body.job_salary_min == 0) {
            filter += " job_salary_min >= " + req.body.job_salary_min;
        }
        if (req.body.job_targeted_people) {
            filter += " job_targeted_people = " + format(req.body.job_targeted_people);
        }
        this.sql += filter;
    }
};

exports.getJobs = (req, res, next) => {
    conn.query("SELECT  j.job_id,j.job_title,j.job_targeted_people,j.job_salary_min,j.job_salary_max FROM jobs j",
        function (err, data, fields) {
            if (err) return next(new AppError(err))
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        });
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

exports.filterJobs = (req, res, next) => {

    filter = new jobFilter;
    filter.filterBuilding(req);
    conn.query(
        filter.sql,
        [],
        function (err, data, fields) {
            if (err) return next(new AppError(filter.sql, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};


