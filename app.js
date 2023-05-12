const express = require("express");
const cors = require("cors");
const router = require("./routes");
const AppError = require("./utils/appError.js");
const errorHandler = require("./utils/errorHandler.js");

const app = express();
app.use(express.json());
const PORT = 3000;

app.use(errorHandler);
app.use(router);

app.all("*", (req, res, next) => {
    next(new AppError(`The URL ${req.originalUrl} does not exists`, 404));
});

app.listen(
    PORT,
    () => console.log(`it is alive on http://localhost:${PORT}`)
);

module.exports = app;




