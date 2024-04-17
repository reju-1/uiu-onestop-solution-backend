import fs from "fs";
import path from "path";

//  Directories for Question-Bank, Books and Email-Attachment-Uploads

function configDir() {
  const uploadDirs = ["qbs", "books", "emailUploads"];

  uploadDirs.forEach((dir) => {
    const dirPath = path.join("public/uploads", dir);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
  });
}

export default configDir;
