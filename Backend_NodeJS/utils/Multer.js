const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinaryConfig = require("./cloudinaryConfig");
const cloudinary = require("cloudinary").v2;

const artistStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ArtisteImage",
    public_id: (req, file) => req.body.nom,
  },
});
const oeuvreStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "art_collection",
  },
});

const uploadImage = multer({
  storage: artistStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([{ name: "image", maxCount: 1 }]);

const uploadImageAndFile = multer({
  storage: oeuvreStorage,
  limits: { fileSize: 1024 * 1024 * 5 },
}).fields([
  { name: "url", maxCount: 1 },
  { name: "preuveAchat", maxCount: 1 },
  { name: "certificat", maxCount: 1 },
]);
module.exports = { uploadImage, uploadImageAndFile };
