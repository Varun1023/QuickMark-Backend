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


const corsOptions = {
  origin: [
    "http://localhost:3000",             
    "http://quickmark-frontend.vercel.app"     
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use(cors(corsOptions));


app.options("*", cors(corsOptions));


app.use(express.json());


db();


app.use("/api/auth", Authroute);
app.use("/api/attendance", qrRoute);
app.use("/api/attendance", srouter);
app.use("/api/attendance", countRouter);
app.use("/api/student-dashboard", sdr);

app.get("/", (req, res) => {
  res.send("QuickMark Backend is Live 🚀");
});

app.get("/api/auth/test", (req, res) => {
  res.json({ ok: true, msg: "Auth route is mounted" });
});


const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
