function RequestEquipment(app, db, verifyToken) {
  app.get("/rentequipment", verifyToken, (req, res) => {
    const query =
      "select equipName, equipType, brand, power, froms, tos, fair, pincode, imagePaths from equipments";

    db.query(query, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      // console.log(err);

      res.json(result);
    });
  });
}

module.exports = RequestEquipment;
