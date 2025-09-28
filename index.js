const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const verifyToken = require("./verifyUser");
//
const register = require("./Register");
const login = require("./Login");
const home = require("./Home.js");
const profile = require("./Profile.js");
const AddEquipment = require("./AddEquipment.js");
const RequestEquipment = require("./RequestEquipment.js");
const Dashboard = require("./DashBoard.js");

//

//
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://TheNooBByte.github.io"],
    credentials: true,
  })
); // Adjust for frontend
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "assets")));

//
//
//for images
app.use(
  "/assets/myimage",
  express.static(path.join(__dirname, "assets/myimage"))
);

// const db = mysql.createConnection({
//   host: "shinkansen.proxy.rlwy.net",
//   user: "root",
//   password: "HrEqiDVrLTYCbsGfjNFMHmLxSkMmMrqE",
//   database: "railway",
//   port: "49112",
//   connectTimeout: 10000,
// });

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  // password: "shreeram",
  password: "shivam",
  database: "KrishiMitra",
});

db.connect((err) => {
  if (err) console.log(err);
  else console.log("MySQL Connected...");
});

// **User Registration**
register(bcrypt, app, db);
// ** User Login**
login(bcrypt, jwt, app, db);
//
home(app, db, verifyToken);
//
profile(app, db, verifyToken, bcrypt);
//
AddEquipment(app, db, verifyToken);
//
RequestEquipment(app, db, verifyToken);
//
Dashboard(app, db, verifyToken);

// **Logout**
app.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});
app.post("/logoutUsers", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
