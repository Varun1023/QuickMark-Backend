const Attendance = require("../model/Attendance");

const getAttendanceCount = async (req, res) => {
  try {
    const { sessionToken } = req.params;

    // 1️⃣ Validate input
    if (!sessionToken) {
      return res.status(400).json({
        message: "Session token is required",
      });
    }

    // 2️⃣ Count attendance for this QR session
    const count = await Attendance.countDocuments({ sessionToken });

    return res.status(200).json({
      count,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getAttendanceCount,
};
