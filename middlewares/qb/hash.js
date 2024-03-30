import fs from "fs";
import crypto from "crypto";

function calculateHash(req, res, next) {
  const filePath = req.file?.path;

  try {
    if (!filePath) {
      throw new Error("File path is missing in the request.");
    }

    const readStream = fs.createReadStream(filePath);
    const hash = crypto.createHash("sha256");

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      const fileHash = hash.digest("hex");
      req.hash = fileHash;
      next();
    });

    readStream.on("error", (error) => {
      console.error("Error reading file:", error);
      next("Error occurred while reading the file");
    });
  } catch (error) {
    console.error("Error generating hash:", error);
    next("Error occurred while generating hash");
  }
}

async function compareHash(req, res, next) {
  next();
}

export { calculateHash, compareHash };
