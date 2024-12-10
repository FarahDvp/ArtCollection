const isImageFile = (filename) => {
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg", "webp", "bmp"];
  const fileExtension = filename
    .substring(filename.lastIndexOf(".") + 1)
    .toLowerCase();
  return imageExtensions.includes(fileExtension);
};

const formatImage = { isImageFile };
export default formatImage;
