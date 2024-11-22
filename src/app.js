const express = require("express");
const cors = require("cors");
const path = require('path')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express();

app.use(cors({
    origin: process.env.ADMIN_URL,
    credentials: true,
}));
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //to parse data of any type, if 'true', only string, array and nested objects are allowed

app.use('/src/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.get('/', (req,res)=>{
    res.send("Hi from tMMA")
})
// app.use("/api", router);


module.exports = app;
