function Dashboard(app, db, verifyToken) {
  app.get("/dashBoard", verifyToken, (req, res) => {
    let query = "SELECT * FROM requests";

    db.query(query, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }

      // Send data back to frontend
      // console.log(result);

      res.json({ message: "Success", data: result });
    });
  });

  app.post("/dashboard", (req, res) => {
    const { id, status } = req.body;

    const query = "UPDATE requests SET STATUS = ? WHERE id = ?";
    db.query(query, [status, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Status updated successfully" });
    });
  });
}

module.exports = Dashboard;
