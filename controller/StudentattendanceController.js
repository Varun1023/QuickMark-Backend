const AttendanceSession = require("../model/AttendanceSession");
const Attendance = require("../model/Attendance");

const markAttendance = async (req, res) => {
  try {
    const { sessionToken } = req.body;

    // 1️⃣ Validate input
    if (!sessionToken) {
      return res.status(400).json({
        message: "Session token is required",
      });
    }

    // 2️⃣ Check if session exists & active
    const session = await AttendanceSession.findOne({
      sessionToken,
      isActive: true,
    });

    if (!session) {
      return res.status(404).json({
        message: "Invalid or expired QR",
      });
    }

    // 3️⃣ Check expiry
    if (session.expiresAt < new Date()) {
      session.isActive = false;
      await session.save();

      return res.status(400).json({
        message: "QR session expired",
      });
    }

    // 4️⃣ Mark attendance (duplicate-safe)
    await Attendance.create({
      sessionToken,
      studentId: req.student.id,
    });

    return res.status(201).json({
      message: "Attendance marked successfully",
    });

  } catch (error) {
    // Duplicate attendance error
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Attendance already marked",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  markAttendance,
};
