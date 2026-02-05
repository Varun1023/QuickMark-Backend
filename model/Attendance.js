const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    sessionToken: {
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    markedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 🚫 Prevent duplicate attendance
attendanceSchema.index({ sessionToken: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
