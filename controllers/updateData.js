const AppError = require("../utils/appError");
const conn = require("../services/db");
const auth = require("./authentication");
class TableUpdater {
    constructor(table, column, req) {
        this.table = table;
        this.column = column;
        this.updateTable(table, column, req);
    }

    updateTable(table, column, req) {
        this.sql = `UPDATE ${table} SET ${column} = ? WHERE id = ?`;
        this.message = `${table} ${column} updated`;
        this.values = [req.body.data, req.params.id];
    }
}

exports.updateTable = async (req, res, next, table) => {
    if (!req.params.id) {
        return next(new AppError('No ID found', 404));
    }
    
    const column = req.params.type;
    const tableUpdater = new TableUpdater(table, column, req);
    
    if (column == 'id') {
        return next(new AppError("id can't be updated", 401));
    }
    else if(column == "password") {
        tableUpdater.values[0] = await auth.hashPassword(req.body.data);
    }


    conn.query(tableUpdater.sql, tableUpdater.values, function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
            status: 'success',
            message: tableUpdater.message,
        });
    });
};
