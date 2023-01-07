const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

const excelToJson = require("./utils");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const app = express();

app.post("/api/v1/upload", upload.single("file"), async (req, res) => {
  const { file } = req;

  try {
    const json = await excelToJson(file.path);

    fs.writeFileSync("result.json", json);

    // const response = await axios.post(
    //   "https://deusa.com.ng/api/store-students",
    //   json,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    res.status(200).json({
      status: "success",
      message: "File uploaded successfully",
      data: json,
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
