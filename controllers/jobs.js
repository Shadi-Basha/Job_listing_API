const AppError = require("../utils/appError");
const addData = require("./addData");
const deleteData = require("./deleteData");
const updateData = require("./updateData");
const conn = require("../services/db");
const access = require("./access");
const jobApplication = require("./jobApplication");
const auth = require("./authentication");

class Job {
    constructor(id, title, description, requirement, salaryMin, salaryMax, targetedPeople, userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requirement = requirement;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.targetedPeople = targetedPeople;
        this.userId = userId;
    }
}

exports.addJob = async (req, res, next) => {
    const token = auth.authenticateToken(req, res, next);
    if (token) {
        const job = new Job(
            req.body.id,
            req.body.title,
            req.body.description,
            req.body.requirement,
            req.body.salaryMin,
            req.body.salaryMax,
            req.body.targetedPeople,
            token.userId
        );
        addData.addDataToTable(req, res, next, job);
    } else
        next(new AppError('Not authorized', 401));
};

exports.updateJob = async (req, res, next) => {
    const jobData = await this.getJobById(req.params.id);
    if (await access.onlyId(jobData.userId, req, res, next) == true) {
        updateData.updateTable(req, res, next, "jobs");
    } else
        next(new AppError('Not authorized', 401));
};


exports.getJobById = (id) => {
    const sql = 'SELECT * FROM jobs WHERE id = ?';
    const values = [id];
    return new Promise((resolve, reject) => {
        conn.query(sql, values, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data[0]);
            }
        });
    });
};

exports.deleteJob = async (req, res, next) => {
    const jobData = await this.getJobById(req.params.id);
    
    if(jobData){
        if (await access.onlyId(jobData.userId, req, res, next) == true) {
            jobApplication.deleteAllApplicationsWithJobId(req.params.id);
            deleteData.deleteDataFromTable(req.params.id, res, next, "jobs", req.params.id);
        } 
        else
            next(new AppError('Not authorized', 401));
    }
    else
        next(new AppError('This job is not found', 404));
};




