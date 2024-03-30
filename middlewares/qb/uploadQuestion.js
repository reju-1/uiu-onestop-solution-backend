import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Destination folder
    cb(null, "public/uploads");
  },

  filename: function (req, file, cb) {
    //Order is important if file is the first field the req.body will be empty
    // console.log(req.body);
    const { course, type, year, department } = req.body;
    let fileName = `${course}-${type}-${year}-${department}`
      .toLowerCase()
      .split(" ")
      .join("-");
    fileName = fileName + "-" + Date.now() + path.extname(file.originalname);

    cb(null, fileName);
  },
});

// File filter to allow only PDF files
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// Set up Multer with limits and storage and filtering
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // Limit file size to 20MB
  },
  fileFilter: fileFilter,
});

export default upload.single("pdfFile");
