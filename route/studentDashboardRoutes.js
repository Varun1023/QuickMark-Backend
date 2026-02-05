const express = require("express");
const { getStudentDashboardStats } = require("../controller/studentDashboardController");
const studentAuth = require("../middleware/studentAuth");

const sdr = express.Router();

sdr.get("/stats", studentAuth, getStudentDashboardStats);

module.exports = sdr;
