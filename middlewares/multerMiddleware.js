import multer from "multer";

export default function configureMulter(destination) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },

    filename: (req, file, cb) => {
      cb(null, `${Math.floor(Math.random() * 900) + 100}-${file.originalname}`);
    },
  });

  return multer({ storage });
}
