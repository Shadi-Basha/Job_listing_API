const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.deleteDataFromTable = (req, res, next, tableName) => {
    const query = "DELETE FROM " + tableName + " WHERE id = ?";

    conn.query(query, req.params.id, function (err, fields) {
        if (err) return next(new AppError(err, 500));

        res.status(200).json({
            status: "success",
            message: tableName + " deleted",
        });
    });
};