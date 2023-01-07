const fs = require("fs");
const xlsx = require("xlsx");

async function excelToJson(inputFile) {
  // Read the input file as a binary string
  const data = fs.readFileSync(inputFile, "binary");

  // Parse the binary string into a workbook object
  const wb = xlsx.read(data, { type: "binary" });

  // Get the first sheet in the workbook
  const ws = wb.Sheets[wb.SheetNames[0]];

  // Convert the sheet data to a JSON object
  const jsonData = xlsx.utils.sheet_to_json(ws);

  // console.log(jsonData);

  // Generate the result object using the specified keys
  // const result = {};
  // jsonData.forEach((row, index) => {
  //   result[keys[index]] = row;
  // });

  return JSON.stringify(jsonData, null, 2);

  // // Write the JSON object to the output file
  // fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));
}

module.exports = excelToJson;
