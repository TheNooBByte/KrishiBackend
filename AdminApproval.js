function AdminApproval(app, db) {
  app.get("/adminApproval", (req, res) => {
    const query = "select * from users";

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

  app.post("/adminApproval", (req, res) => {
    const { status, id } = req.body;

    const query = `UPDATE users SET kycStatus = ? WHERE id = ?`;

    db.query(query, [status, id], (err, result) => {
      if (err) {
        console.error("Error updating KYC:", err.message);
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "KYC status updated successfully", data: result });
    });
  });
}

module.exports = AdminApproval;
