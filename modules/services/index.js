import { Storage } from "@google-cloud/storage";
import express from "express";
import multer from "multer";
import { format } from "util";
import CONFIG from "../../config.js";
import routeGuard from "../middlewares/routeGuard.js";
import validator from "../middlewares/validator.js";
const router = express.Router();
const storage = new Storage({
  keyFilename: "keyfile.json",
  projectId: CONFIG.GCP.PROJECT_ID,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

const bucket = storage.bucket(CONFIG.GCP.BUCKET_NAME);

const fileUpload = (req, res) => {
  console.log(req.file)
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    console.log(err.message, "----error blob");
    return res.json({ status: false, message: err.message });
  });

  blobStream.on("finish", () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );
    return res.json({ status: true, file: publicUrl });
  });

  blobStream.end(req.file.buffer);
};

const uploadBuffer = async (fileName, buffer) => {
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    console.log(err.message, "----error blob");

  });

  let uploadFile = new Promise((resolve, reject) => {
    blobStream.on("finish", () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${fileName}`
      );

      resolve(publicUrl)
    })
  });

  blobStream.end(buffer);
  return uploadFile

}

router.post(
  "/file-upload",
  routeGuard(),
  upload.single("file"),
  validator,
  fileUpload
);

export default { uploadBuffer, router };
