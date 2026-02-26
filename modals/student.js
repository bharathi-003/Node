const express = require("express");
const router = express.Router();
const studentModel = require("../models/student");

/* =========================
   CREATE STUDENT (POST)
========================= */
router.post("/", async (req, res) => {
  try {
    const { name, email, sin_number } = req.body;

    // Validation
    if (!name || !email || !sin_number) {
      return res.status(400).json({
        message: "Name, Email and SIN Number are required",
      });
    }

    const studentId = await studentModel.createStudent({
      name,
      email,
      sin_number,
    });

    res.status(201).json({
      message: "Student created successfully",
      id: studentId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating student",
      error: error.message,
    });
  }
});

module.exports = router;