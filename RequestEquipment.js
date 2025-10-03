function RequestEquipment(app, db, verifyToken) {
  app.get("/rentequipment", verifyToken, (req, res) => {
    const query =
      "select userId, equipName, equipType, brand, power, froms, tos, fair, pincode, imagePaths from equipments";

    db.query(query, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      // console.log(err);

      res.json(result);
    });
  });

  app.post("/rentequipment", verifyToken, (req, res) => {
    const { userdata, userId, mob } = req.body;

    // console.log(userdata.imagePaths);

    // console.log(userdata, userId, mob);

    const query = `
    insert into requests 
    (providerId, renterID, mobileNo, equipName, equipType, brand, power, froms, tos, totalFair, imagePaths, STATUS)
    values (
      ${userdata.userId}, 
      ${userId}, 
      '${mob}', 
      '${userdata.equipName}',
      '${userdata.equipType}',
      '${userdata.brand}',
      '${userdata.power}',
      '${userdata.froms}',
      '${userdata.tos}',
      '${userdata.fair}',
      '${userdata.imagePaths}',
      'Pending'
    )`;
    console.log(query);

    db.query(query, (err, result) => {
      if (err) {
        console.log("here is the black ship");

        console.log(err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Request Submitted Successfully" });
    });
  });
}

module.exports = RequestEquipment;
