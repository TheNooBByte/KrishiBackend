function Profile(app, db, verifyToken, bcrypt) {
  // console.log("its exicuting");

  app.put("/profile", verifyToken, async (req, res) => {
    const { id, username, password, Email, mobileNo, pincode } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `update users set username = '${username}', PASSWORD = '${hashedPassword}', Email = '${Email}', mobileNo = '${mobileNo}', pincode = '${pincode}' where id = ${id}`;
    // console.log(query);

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
        console.log("from profile", err.message);
      }

      res.json({ message: "Your Profile Successfully Updated!" });
    });
  });
}

module.exports = Profile;
