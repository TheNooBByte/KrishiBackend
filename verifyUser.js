const jwt = require("jsonwebtoken");
const SECRET_KEY = "Shivam"; // Store securely in .envL

const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // console.log("Received Token:", token); // Debugging

  if (!token) {
    // console.log("No token provided");
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ error: "Invalid token" });
    }

    // console.log("Decoded Token:", decoded); // Debugging
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;

//  for frontend
// Sending Data via Query Parameters (Recommended)
// axios
//   .get("http://localhost:5000/data", {
//     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     params: { table: "student", filter: "age < 21" },
//   })
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log("Unauthorized", err));

//  post method
// axios
//   .post(
//     "http://localhost:5000/data",
//     {
//       table: "student",
//       filters: { age: "< 21" },
//     },
//     {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     }
//   )
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log("Unauthorized", err));

//
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhdW5hayIsImlhdCI6MTczOTE3NTE3MiwiZXhwIjoxNzM5MTc4NzcyfQ.gqovB4ddwjKmBZNjcb-Jp6-oDh-OXS78PPi6NbLfEZY

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJhdW5hayIsImlhdCI6MTczOTE3NTMxMiwiZXhwIjoxNzM5MTc4OTEyfQ.9ovN2QRwiSRyBw3dyktfCr4fk_DiG95YQgsy6k3UGog
