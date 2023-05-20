const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.addDataToTable = (req, res, next, dataObject) => {
    if (!req.body) return next(new AppError("No form data found", 404));
  
    const values = Object.values(dataObject);
  
    const columns = Object.keys(dataObject);
  
    const tableName = dataObject.constructor.name.toLowerCase() + 's';
  
    const query = "INSERT INTO " + tableName + " (" + columns.join(", ") + ") VALUES (?)";
  
    conn.query(query, [values], function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
  
      res.status(201).json({
        status: "success",
        message: tableName + " added",
      });
    });
  };