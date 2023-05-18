const AppError = require("../utils/appError");
const conn = require("../services/db");

function format(string) {
    return '"' + string + '"';
}

class jobFilter {
    sql;
    req;

    filterBuilding(req) {
        this.sql = "SELECT j.id,j.title,j.targetedPeople,j.salaryMin,j.salaryMax FROM jobs j WHERE 1=1 ";
        let filter = "";
        let flage = false;
        if (req.body.id) {
            filter += " and id = " + format(req.body.id);
        }
        if (req.body.title) {
            filter += "and title = " + format(req.body.title);
        }
        if (req.body.salaryMax) {
            filter += " and salaryMax <= " + req.body.salaryMax;
        }
        if (req.body.salaryMin || req.body.salaryMin == 0) {
            filter += " and salaryMin >= " + req.body.salaryMin;
        }
        if (req.body.targetedPeople) {
            filter += " and targetedPeople = " + format(req.body.targetedPeople);
        }
        this.sql += filter;
    }
};

exports.getJobs = (req, res, next) => {
    conn.query("SELECT j.id,j.title,j.targetedPeople,j.salaryMin,j.salaryMax FROM jobs j",
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


