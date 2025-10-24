const express = require("express");
const router = express.Router();
const db = require("../config/db");


router.get("/get-user", (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const sql = "SELECT id, name, role FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: "User not found" });
    res.json(results[0]);
  });
});

router.post("/create-user", (req, res) => {
  const { firebaseId, name, email, role } = req.body;

  if (!firebaseId || !name || !email || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO users (firebaseId, name, email, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [firebaseId, name, email, role], (err, result) => {
    if (err) {
      console.error("MySQL error:", err);
      return res.status(500).json({ message: "Failed to create MySQL user", error: err.message });
    }
    res.json({ id: result.insertId, name, email, role });
  })
})
module.exports = router;
