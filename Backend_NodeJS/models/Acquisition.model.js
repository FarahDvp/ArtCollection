const mongoose = require("mongoose");

const acquisitionModel = new mongoose.Schema(
  {
    /*** ACquisition  */

    proprietaireActuel: {
      type: String,
      required: true,
    },

    lieuAcquisition: {
      type: String,
      required: false,
    },
    dateAcquisition: {
      type: Date,
      required: false,
    },
    prixAcquisition: {
      type: Number,
      required: false,
    },
    moyenAcquisition: {
      type: String,
      enum: ["Achat", "Don", "Legs"],
      required: false,
    },

    preuveAchat: {
      type: String,
      required: false,
    },
    certificat: {
      type: String,
      required: false,
    },
    oeuvre: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Oeuvre",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Acquisition", acquisitionModel);
