const AppError = require("../utils/appError");
const addData = require("./addData");
const deleteData = require("./deleteData");
const updateData = require("./updateData");
const conn = require("../services/db");
const auth = require("./authentication");

class Job {
    constructor(id, title, description, requirement, salaryMin, salaryMax, targetedPeople) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requirement = requirement;
        this.salaryMin = salaryMin;
        this.salaryMax = salaryMax;
        this.targetedPeople = targetedPeople;
    }
}


exports.addJob = (req, res, next) => {
    const job = new Job(
        req.body.id,
        req.body.title,
        req.body.description,
        req.body.requirement,
        req.body.salaryMin,
        req.body.salaryMax,
        req.body.targetedPeople
    );
    auth.authenticateToken();
    addData.addDataToTable(req, res, next, job);
};

exports.updateJob = (req, res, next) => {
    updateData.updateTable(req, res, next, "jobs");
};

exports.deleteJob = (req, res, next) => {
    deleteData.deleteDataFromTable(req, res, next, "jobs", req.params.id);
};




