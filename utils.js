const fs = require("fs");
const xlsx = require("xlsx");

/**
 * Formats the keys of an object by converting them to lowercase and replacing spaces with underscores.
 * @param {Object} obj - The object whose keys need to be formatted.
 * @returns {Object} - The modified object with formatted keys.
 */
function formatKeys(obj) {
  const keys = Object.keys(obj);
  const modifiedObj = {};
  keys.forEach((key) => {
    const modifiedKey = key.toLowerCase().replace(/\s/g, "_");
    modifiedObj[modifiedKey] = obj[key];
  });
  return modifiedObj;
}

/**
 * Converts an Excel file to JSON format.
 *
 * @param {string} inputFile - The path to the Excel file.
 * @returns {Promise<string>} - A Promise that resolves to the JSON representation of the Excel data.
 */
async function excelToJson(inputFile) {
  // Read the input file as a binary string
  const data = fs.readFileSync(inputFile, "binary");

  // Parse the binary string into a workbook object
  const wb = xlsx.read(data, { type: "binary" });

  // Get the first sheet in the workbook
  const ws = wb.Sheets[wb.SheetNames[0]];

  // Convert the sheet data to a JSON object
  const jsonData = xlsx.utils.sheet_to_json(ws);

  const result = [];
  jsonData.forEach((row, _) => {
    result.push(formatKeys(row));
  });

  return JSON.stringify(result, null, 2);
}

module.exports = excelToJson;
