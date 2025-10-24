const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/:userId", (req, res) => {
  db.query("SELECT * FROM notifications ORDER BY date DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  })
})

router.post("/create", (req, res) => {
  const { message } = req.body;
  db.query("INSERT INTO notifications (message) VALUES (?)", [message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Notification created", id: result.insertId });
  });
});

module.exports = router;
