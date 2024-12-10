const mongoose = require("mongoose");

const ArtisteModel = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    biographie: {
      type: String,
      required: true,
    },
    dateNaissance: {
      type: Date,
      required: true,
    },
    lieuNaissance: {
      type: String,
      required: true,
    },
    dateDece: {
      type: Date,
      required: false,
    },

    lieuDece: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/duchnti5k/image/upload/v1676485990/art_collection/profile_xbzcqu.png",
    },
    nationalite: [
      {
        label: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: false,
        },
      },
    ],

    oeuvre: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Oeuvre",
      },
    ],
    sexe: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artiste", ArtisteModel);
