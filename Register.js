const multer = require("multer");
const path = require("path");
const fs = require("fs");

function register(bcrypt, app, db) {
  // Multer storage setup
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/UserAdhaar"); // folder to store Aadhaar images
    },
    filename: (req, file, cb) => {
      const originalName = path.parse(file.originalname).name;
      const ext = path.extname(file.originalname);
      let filePath = `assets/UserAdhaar/${originalName}${ext}`;

      let counter = 1;
      while (fs.existsSync(filePath)) {
        filePath = `assets/UserAdhaar/${originalName}_${counter}${ext}`;
        counter++;
      }

      cb(null, path.basename(filePath));
    },
  });

  const upload = multer({ storage: storage });

  // Registration route with file upload
  app.post(
    "/register",
    upload.fields([
      { name: "aadhaarFront", maxCount: 1 }, // ✅ matches frontend
      { name: "aadhaarBack", maxCount: 1 }, // ✅ matches frontend
    ]),
    async (req, res) => {
      try {
        const { username, password, Email, MobileNo, pinCode, aadhaarNo } =
          req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const aadhaarFrontPath = req.files?.aadhaarFront?.[0]?.filename || null;
        const aadhaarBackPath = req.files?.aadhaarBack?.[0]?.filename || null;

        const sql = `
          INSERT INTO users 
          (username, password, Email, MobileNo, pinCode, aadhaarNo, aadhaarFront, aadhaarBack) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(
          sql,
          [
            username,
            hashedPassword,
            Email,
            MobileNo,
            pinCode,
            aadhaarNo,
            aadhaarFrontPath,
            aadhaarBackPath,
          ],
          (err, result) => {
            if (err) {
              if (err.message.includes("Duplicate")) {
                return res
                  .status(400)
                  .json({ error: "You are already registered" });
              }

              console.log(err.message);

              return res.status(500).json({ error: err.message });
            }
            res.json({ message: "✅ Registration successful" });
          }
        );
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    }
  );
}

module.exports = register;
