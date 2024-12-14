const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const academicsRouter = require("./routes/academics.routes");
const { errorHandler } = require("./middlewares/error.middleware");


const app = express();

app.use(
    cors({
        origin: process.env.ADMIN_URL,
        credentials: true,
        methods: ['GET', 'POST']
    })
);
app.use(cookieParser())
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //to parse data of any type, if 'true', only string, array and nested objects are allowed

// app.use("/src/uploads", express.static(path.join(__dirname,"uploads")));


app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
}, express.static(path.join('uploads')));

// routes
app.get("/", (req, res) => {
    res.send("Hi from tMMA");
});
app.use("/api", [authRouter, academicsRouter]);
app.use(errorHandler) //error handler middleware

module.exports = app;
