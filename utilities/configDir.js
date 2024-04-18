import fs from "fs";
import path from "path";

//  Directories for Question-Bank, Books, Events and temp for Email-Attachment

function configDir() {
  const uploadDirs = ["qbs", "books", "events", "temp"];

  uploadDirs.forEach((dir) => {
    const dirPath = path.join("public/uploads", dir);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
  });
}

export default configDir;
