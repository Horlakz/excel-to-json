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

async function main() {
  // Parse the command line arguments
  const inputFile = process.argv[2];
  const outputFile = process.argv[3];
  const keys = process.argv.slice(4);

  // Validate the arguments
  if (!inputFile || !outputFile || keys.length === 0) {
    console.error("Error: Invalid arguments");
    console.error(
      "Usage: node excel-to-json.js <input file> <output file> <key1> <key2> ... <keyN>"
    );
    process.exit(1);
  }

  // Convert the Excel file to a JSON file
  await excelToJson(inputFile, outputFile, keys);
}

module.exports = excelToJson;
