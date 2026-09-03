import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },

  fileFilter: (req, file, cb) => {
    console.log("MIME TYPE:", file.mimetype);

    const allowedMime = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    const allowedExt = [".pdf", ".jpg", ".jpeg", ".png"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (
      allowedMime.includes(file.mimetype) ||
      (file.mimetype === "application/octet-stream" &&
        allowedExt.includes(ext))
    ) {
      return cb(null, true);
    }

    cb(new Error("Only PDF, JPG and PNG are allowed"));
  },
});