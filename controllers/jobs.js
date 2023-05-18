const AppError = require("../utils/appError");
const conn = require("../services/db");

// class job {
//     job_id;
//     job_title;
//     job_description;
//     job_requirement;
//     job_salary_min;
//     job_salary_max;
//     job_targeted_people;
//     sql;
//     values;
//     message;

//     constructor(job_id, job_title, job_description, job_requirement, job_salary_min, job_salary_max, job_targeted_people) {
//         this.job_id = job_id;
//         this.job_title = job_title;
//         this.job_description = job_description;
//         this.job_requirement = job_requirement;
//         this.job_salary_min = job_salary_min;
//         this.job_salary_max = job_salary_max;
//         this.job_targeted_people = job_targeted_people;
//     }
// }

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




