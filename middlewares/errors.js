import multer from "multer";

function notFoundHandler(req, res, next) {
  next("Requested resource is not found");
}

function commonErrorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      // 413 Payload Too Large
      return res.status(413).json({ error: "File size too large" });
    } else {
      // Handle other Multer errors
      return res.status(400).json({ error: "File upload error" });
    }
  } else {
    // For other errors
    return res.status(500).json({ error: err });
  }
}

export { commonErrorHandler, notFoundHandler };
