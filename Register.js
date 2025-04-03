function register(bcrypt, app, db) {
  app.post("/register", async (req, res) => {
    const { username, password, Email, MobileNo, pinCode } = req.body;
    // console.log(username, password, Email, MobileNo, pinCode);
    // console.log(req.body);

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql =
      "INSERT INTO users (username, password, Email, MobileNo, pinCode) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sql,
      [username, hashedPassword, Email, MobileNo, pinCode],
      (err, result) => {
        if (err) {
          // console.log(err.message);
          // console.log(hashedPassword);

          if (err.message.startsWith("Duplicate")) {
            err.message = "You were Already Registered";
          }
          // console.log(err);

          return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Registeration successfully" });
      }
    );
  });
}

module.exports = register;
