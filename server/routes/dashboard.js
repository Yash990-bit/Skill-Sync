const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/stats/:userId", (req, res) => {
  const sql = `
    SELECT 
      COUNT(*) AS assigned,
      SUM(status='Completed') AS completed,
      SUM(status='Pending') AS pending
    FROM projects
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

module.exports = router;
