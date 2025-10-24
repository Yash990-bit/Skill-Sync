const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/active/:userId", (req, res) => {
  const sql = `
    SELECT p.id, p.name, p.status, p.deadline,
           client.name AS client, freelancer.name AS freelancer
    FROM projects p
    JOIN users client ON p.client_id = client.id
    LEFT JOIN users freelancer ON p.freelancer_id = freelancer.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  })
})
router.post("/create", (req, res) => {
  const { name, description, client_id, freelancer_id, status, budget, deadline } = req.body;
  const sql = `
    INSERT INTO projects (name, description, client_id, freelancer_id, status, budget, deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [name, description, client_id, freelancer_id, status, budget, deadline], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Project created successfully", id: result.insertId });
  });
});

module.exports = router;
