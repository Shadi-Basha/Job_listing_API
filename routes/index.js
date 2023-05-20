const express = require("express");
const jobsController = require("../controllers/jobs");
const jobsFilterController = require("../controllers/jobFilter");
const applicationController = require("../controllers/jobApplication");
const userController = require("../controllers/user");
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
    .get(jobsFilterController.getJobsById)
    .delete(jobsController.deleteJob);

router
    .route("/jobs/:id/applications")
    .post(applicationController.submitApplication)
    .get(applicationController.getApplicationsForJob);

router
    .route("/jobs/:id/:type")
    .post(jobsController.updateJob);

router
    .route("/applications/:id")
    .get(applicationController.getApplicationById)
    .delete(applicationController.deleteApplication);

router
    .route("/applications/:id/:type")
    .post(applicationController.updateApplication);

router
    .route("/user")
    .get(userController.showAllUsers);

router
    .route("/user/registration")
    .post(userController.addUser);

router
    .route("/user/:id")
    .get(userController.getUserById)
    .delete(userController.deleteUser);

router
    .route("/user/:id/applications")
    .get(applicationController.getUserApplications);

router
    .route("/user/:userId/applications/:applicationId")
    .get(applicationController.getUserApplicationsbyId);


module.exports = router;



