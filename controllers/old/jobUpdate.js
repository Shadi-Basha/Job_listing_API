const AppError = require("../utils/appError");
const conn = require("../services/db");


// class jobUpdater {
//     type;
//     req;
//     sql;
//     values;
//     message;

//     constructor(type, req) {
//         this.req = req;
//         this.type = type;
//         this.updateJob(type, req);
//     }

//     updateJob(type, req) {
//         this.sql = "UPDATE jobs SET " + type + " = ? where id = ?";
//         this.message = "job " + type + " updated";
//         this.values = [req.body.data, req.params.id];
//     };
// };

// exports.updatejobs = (req, res, next) => {
//     if (!req.params.id) {
//         return next(new AppError("No job id found", 404));
//     }
//     jobUpdate = new jobUpdater(req.params.type, req);
//     conn.query(
//         jobUpdate.sql,
//         jobUpdate.values,
//         function (err, data, fields) {
//             if (err) return next(new AppError(err, 500));
//             res.status(201).json({
//                 status: "success",
//                 message: jobUpdate.message,
//             });
//         }
//     );
// };

