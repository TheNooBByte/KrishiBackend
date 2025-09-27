function Dashboard(app, db, verifyToken) {
  app.get("/dashBoard", verifyToken, (req, res) => {
    let query = "SELECT * FROM requests";

    db.query(query, (err, result) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
      }

      // Send data back to frontend
      res.json({ message: "Success", data: result });
    });
  });
}

module.exports = Dashboard;
