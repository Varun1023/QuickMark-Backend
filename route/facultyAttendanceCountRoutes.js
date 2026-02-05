const express = require("express");
const { getAttendanceCount } = require("../controller/facultyAttendanceCountController");
const facultyAuth = require("../middleware/facultyAuth");

const countRouter = express.Router();

// Faculty fetches attendance count
countRouter.get("/count/:sessionToken", facultyAuth, getAttendanceCount);

module.exports = countRouter;
