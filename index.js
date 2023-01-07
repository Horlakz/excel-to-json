const express = require("express");
const multer = require("multer");
const axios = require("axios");

const excelToJson = require("./utils");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
const app = express();

app.use(express.json());

// app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
app.post("/api/v1/upload", async (req, res) => {
  // const { file } = req;
  const { file_path } = req.body;

  try {
    if (!file_path) {
      res.status(400).json({ status: "error" });
      return;
    }

    const json = await excelToJson(file_path);

    const response = await axios.post(
      "https://deusa.com.ng/api/store-students",
      json,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "File uploaded successfully",
      data: response.data,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
