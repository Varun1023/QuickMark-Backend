require("dotenv").config();
const express = require("express");

const cors = require("cors");

const db = require("./dbconfig/dbconfig");
const { Authroute } = require("./route/AuthRoute");
const { qrRoute } = require("./route/attendanceRoutes");
const srouter = require("./route/StudentattendanceRoutes");
const countRouter = require("./route/facultyAttendanceCountRoutes");
const sdr = require("./route/studentDashboardRoutes");

const app = express();

// 🔗 Connect DB
db();

app.use(cors())
app.use(express.json())

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", Authroute);
app.use("/api/attendance", qrRoute);
app.use("/api/attendance", srouter);
app.use("/api/attendance", countRouter);
app.use("/api/student-dashboard", sdr);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
