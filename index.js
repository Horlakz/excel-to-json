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

app.use(express.json());

app.post("/upload-excel", upload.single("file"), async (req, res) => {
  const { file } = req;

  // check if file is an excel file
  if (!file.originalname.match(/\.(xls|xlsx)$/)) {
    res.status(400).json({
      status: "error",
      message: "Please upload an Excel file",
    });
    return;
  }

  try {
    const json = await excelToJson(file.path);

    fs.writeFileSync(file.originalname + ".json", json);

    res.status(200).json({
      status: "success",
      message: "File uploaded and converted successfully",
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
