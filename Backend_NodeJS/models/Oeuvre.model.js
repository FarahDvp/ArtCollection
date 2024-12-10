const mongoose = require("mongoose");

const oeuvreModel = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },
    dateDeCreation: {
      type: Date,
      required: true,
      default: Date.now,
    },
    poid: {
      type: Number,
      required: true,
    },
    nbElement: {
      type: Number,
      required: true,
    },
    numeroTirage: {
      type: Number,
      required: true,
    },

    typeTirage: {
      type: String,
      required: false,
    },
    support: {
      type: String,
      required: true,
    },
    dimension: {
      largeur: {
        type: Number,
        required: true,
      },
      profondeur: {
        type: Number,
        required: false,
      },
      hauteur: {
        type: Number,
        required: true,
      },
    },

    categorie: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Categorie",
    },

    artiste: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Artiste",
    },
    materiel: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Materiel",
      },
    ],

    /*** Signature  */
    localisationSurOeuvre: {
      type: String,
      required: true,
    },
    descriptionSignature: {
      type: String,
      required: true,
    },
    /*** Etat  */
    etat: {
      type: String,
      required: false,
    },

    image: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Image",
      },
    ],

    redacteur: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "User",
        },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Oeuvre", oeuvreModel);
