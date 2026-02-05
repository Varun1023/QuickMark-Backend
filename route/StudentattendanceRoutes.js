const express = require("express");
const { markAttendance } = require("../controller/StudentattendanceController");
const studentAuth = require("../middleware/studentAuth");

const srouter = express.Router();

srouter.post("/mark", studentAuth, markAttendance);

module.exports = srouter;
