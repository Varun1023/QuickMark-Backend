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

/* =======================
   CORS CONFIG (LOCAL ONLY)
======================= */
const corsOptions = {
  origin: "http://localhost:3000", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json());

/* =======================
   CONNECT DB
======================= */
db();

/* =======================
   ROUTES
======================= */
app.use("/api/auth", Authroute);
app.use("/api/attendance", qrRoute);
app.use("/api/attendance", srouter);
app.use("/api/attendance", countRouter);
app.use("/api/student-dashboard", sdr);

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.send("QuickMark Backend is Live 🚀");
});

app.get("/api/auth/test", (req, res) => {
  res.json({ ok: true, msg: "Auth route is mounted" });
});

/* =======================
   SERVER
======================= */
const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
