const express = require("express");
const { generateQR } = require("../controller/attendanceController");

const facultyAuth = require("../middleware/facultyAuth");

const qrRoute = express.Router();

qrRoute.post("/generate-qr", facultyAuth, generateQR);

module.exports = {
    qrRoute
}
