import fs from "fs";
import crypto from "crypto";

// external imports
import Question from "../../models/question.js";

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
  try {
    const found = await Question.findOne({ hash: req.hash });

    if (found) {
      const fileUrl = `public/uploads/qbs/${req.file.filename}`;
      // console.log(req.file.path); //due to security this is not used

      fs.unlink(fileUrl, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return;
        }
      });

      next("The Question is already exit in our Database");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    next("Error occurred while comparing Hash");
  }
}

export { calculateHash, compareHash };
