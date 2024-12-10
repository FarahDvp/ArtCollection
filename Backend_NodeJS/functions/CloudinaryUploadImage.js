const { cloudinary } = require("../utils/cloudinaryConfig");

module.exports = async (url) => {
  const uploadResponse = await cloudinary.uploader.upload(url, {
    upload_preset: "art_collection",
  });
  return uploadResponse;
};
