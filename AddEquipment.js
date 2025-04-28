const multer = require("multer");
const path = require("path");
const fs = require("fs");

function AddEquipment(app, db, verifyToken) {
  // Multer Storage Config
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/equipments"); // Store in assets/equipments
    },
    filename: (req, file, cb) => {
      let originalName = path.parse(file.originalname).name; // Extract name (without extension)
      let ext = path.extname(file.originalname); // Extract extension
      let filePath = `assets/equipments/${originalName}${ext}`;

      let counter = 1;
      while (fs.existsSync(filePath)) {
        filePath = `assets/equipments/${originalName}${counter}${ext}`;
        counter++;
      }

      cb(null, path.basename(filePath)); // Return only the filename
    },
  });

  const upload = multer({ storage: storage });

  // Combined Route for Equipment Details & Image Upload
  app.post(
    "/addequipment",
    verifyToken,
    upload.array("images", 10),
    (req, res) => {
      // console.log("Uploaded Files:", req.files); // Log uploaded files
      // console.log("Total Images Received:", req.files.length); // Check count
      const {
        id,
        equipmentname,
        equipmentType,
        brand,
        implementPower,
        fromDate,
        toDate,
        amount,
        MobileNo,
        pinCode,
      } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded" });
      }

      // Store image paths as a comma-separated string
      const imagePaths = req.files.map((file) => file.path).join(",");

      // console.log(imagePaths);

      const query = `
      INSERT INTO equipments (userId, equipName, equipType, brand, power, froms, tos, fair, mobileNo, pincode, imagePaths)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

      const values = [
        id,
        equipmentname,
        equipmentType,
        brand,
        implementPower,
        fromDate,
        toDate,
        amount,
        MobileNo,
        pinCode,
        imagePaths,
      ];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: err.message });
        }

        res.json({
          message: "Your Equipment Added Successfully!",
          images: imagePaths.split(","),
        });
      });
    }
  );
}

module.exports = AddEquipment;
