const AttendanceSession = require("../model/AttendanceSession");
const QRCode = require("qrcode");
const crypto = require("crypto");

const generateQR = async (req, res) => {
  try {
    const { subjectId } = req.body;

    // 1️⃣ Validate input
    if (!subjectId) {
      return res.status(400).json({
        message: "Subject ID is required",
      });
    }

    // 2️⃣ Generate secure session token
    const sessionToken = crypto.randomBytes(32).toString("hex");

    // 3️⃣ Set expiry time (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 4️⃣ Create attendance session
    const session = new AttendanceSession({
      facultyId: req.faculty.id,
      subjectId,
      sessionToken,
      expiresAt,
    });

    await session.save();

    // 5️⃣ Prepare QR payload
    const qrPayload = JSON.stringify({
      sessionToken,
    });

    // 6️⃣ Generate QR code
    const qrCode = await QRCode.toDataURL(qrPayload);

    // 7️⃣ Send response
    return res.status(201).json({
      message: "QR generated successfully",
      qrCode,
      sessionToken,
      expiresAt,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  generateQR,
};
