const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM notifications WHERE user_id = ? ORDER BY date DESC";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM notifications WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Notification deleted" });
  });
});

module.exports = router;
