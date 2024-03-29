const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authController = require("./api/auth/auth.controller");
const nutritionTrackerController = require("./api/nutritionTracker/nutritionTracker.controller");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.disable("x-powered-by");
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(`/api/auth`, authController);
app.use(`/api/nutritionTracker`, nutritionTrackerController);
app.use(express.static("."));

module.exports = app;