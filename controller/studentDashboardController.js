const Attendance = require("../model/Attendance");
const AttendanceSession = require("../model/AttendanceSession");

const getStudentDashboardStats = async (req, res) => {
  try {
    const studentId = req.student.id;

    const attendedCount = await Attendance.countDocuments({
      studentId,
    });

    const totalSessions = await AttendanceSession.countDocuments();

    const attendancePercentage =
      totalSessions === 0
        ? 0
        : Math.round((attendedCount / totalSessions) * 100);

    return res.status(200).json({
      attendancePercentage,
      classesAttended: attendedCount,
      classesMissed: Math.max(totalSessions - attendedCount, 0),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getStudentDashboardStats,
};
