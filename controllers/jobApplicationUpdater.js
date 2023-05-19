const AppError = require("../utils/appError");
const conn = require("../services/db");

class applicationUpdater {
    type;
    req;
    sql;
    values;
    message;

    constructor(type, req) {
        this.req = req;
        this.type = type;
        this.updateApplication(type, req);
    }

    updateApplication(type, req) {
        this.sql = "UPDATE application SET " + type + " = ? where id = ? and userId = ?";
        this.message = "application " + type + " updated";
        this.values = [req.body.data, req.params.applicationId, req.userId];
    };
};

exports.updateApplications = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No job id found", 404));
    }
    applicationUpdate = new applicationUpdater(req.params.type, req);
    conn.query(
        applicationUpdate.sql,
        applicationUpdate.values,
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: applicationUpdate.message,
            });
        }
    );
};