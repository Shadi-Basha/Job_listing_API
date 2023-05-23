const express = require("express");
const jobsController = require("../controllers/jobs");
const jobsFilterController = require("../controllers/jobFilter");
const applicationController = require("../controllers/jobApplication");
const userController = require("../controllers/user");
const router = express.Router();

router
    .route("/jobs")
    .get(jobsFilterController.getJobs)
    .post(jobsController.addJob); // authentcation added

router
    .route("/jobs/filter")
    .post(jobsFilterController.filterJobs);

router
    .route("/jobs/:id")
    .get(jobsFilterController.getJobsById)
    .delete(jobsController.deleteJob); // authentication done

router
    .route("/jobs/:id/applications")
    .post(applicationController.submitApplication) // authentication done
    .get(applicationController.getApplicationsForJob); //authentication done

router
    .route("/jobs/:id/:type")
    .post(jobsController.updateJob); // authentication done

router
    .route("/user")
    .get(userController.showAllUsers)
    .post(userController.addUser);

router
    .route("/user/login")
    .post(userController.login);// token genrated done

router
    .route("/user/:id")
    .get(userController.getUserById)
    .delete(userController.deleteUser); // authentication done

router
    .route("/user/:id/applications")
    .get(applicationController.getUserApplications); // authentication done

router 
    .route("/user/:id/:type")
    .post(userController.updateUser);

router
    .route("/user/:userId/applications/:applicationId")
    .get(applicationController.getUserApplicationsbyId) // authentication done 
    .delete(applicationController.deleteApplication); // authentication done
    
router
.route("/user/:userId/applications/:id/:type")
.post(applicationController.updateApplication); // authentication needed


module.exports = router;



