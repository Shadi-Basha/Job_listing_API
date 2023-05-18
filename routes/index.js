const express = require("express");
const jobsController = require("../controllers/jobs");
const jobsFilterController = require("../controllers/jobFilter");
const jobsUpdateController = require("../controllers/jobUpdate")
const router = express.Router();

router
    .route("/jobs")
    .get(jobsFilterController.getJobs)
    .post(jobsController.addJob);
    
router
    .route("/jobs/filter")
    .post(jobsFilterController.filterJobs);

router
    .route("/jobs/:id")
    .get(jobsFilterController.getJobsUsingId)
    .delete(jobsController.deleteJob);

router
    .route("/jobs/:id/:type")
    .post(jobsUpdateController.updatejobs);


module.exports = router;


// /jobs/:id/:type



