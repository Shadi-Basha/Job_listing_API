const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router
    .route("/jobs")
    .get(controllers.getJobs).post(controllers.addJob);
router
    .route("/jobs/:id")
    .get(controllers.getJobsUsingId)
    .post(controllers.updateJobTitle)
    .delete(controllers.deleteJob);

module.exports = router;