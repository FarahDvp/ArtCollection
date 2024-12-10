const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defimg =
  "https://res.cloudinary.com/duchnti5k/image/upload/v1676485990/art_collection/profile_xbzcqu.png";

const UserModel = new Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    birthDate: { type: Date, required: false },
    profilImage: { type: String, default: defimg },
    sex: {
      type: String,
      required: true,
      default: "Homme",
      enum: ["Homme", "Femme"],
    },
    role: {
      type: String,
      default: "ADMIN",
      enum: ["SUPERADMIN", "ADMIN"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserModel);
