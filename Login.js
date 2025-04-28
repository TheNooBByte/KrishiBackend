function login(bcrypt, jwt, app, db) {
  const SECRET_KEY = "Shivam"; // Store securely in .envL
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    // console.log(username, password);

    db.query(
      "SELECT * FROM users WHERE  username = ?",
      [username],
      async (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0)
          return res.status(401).json({ error: "User not found" });

        const user = result[0];
        // console.log(user);

        const isMatch = await bcrypt.compare(password, user.PASSWORD);
        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
          { id: user.id, username: user.username },
          SECRET_KEY
        );
        // console.log(result);
        res.cookie("token", token, { httpOnly: true, secure: false }).json({
          message: "Login successful",
          token,
          userData: { ...user },
        });
      }
    );
  });
}

module.exports = login;
