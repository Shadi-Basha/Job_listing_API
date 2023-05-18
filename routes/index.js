const express = require("express");
const jobsController = require("../controllers/jobs");
const jobsFilterController = require("../controllers/jobFilter");
const jobsUpdateController = require("../controllers/jobUpdate");
const applicationController = require("../controllers/jobApplication");
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
    .route("/jobs/:id/applications")
    .post(applicationController.submitApplication)
    .get(applicationController.getApplicationsForJob);

router
    .route("/jobs/:id/:type")
    .post(jobsUpdateController.updatejobs);

router
    .route("/applications/:id")
    .get(applicationController.getApplicationById);

router
    .route("/user");

router
    .route("/user/:id");

router
    .route("/user/:id/applications");

router
    .route("/user/:userId/applications/:applicationId");



module.exports = router;


// /jobs/:id/:type



