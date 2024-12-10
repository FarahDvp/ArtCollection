const mongoose = require("mongoose");

const pretModel = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: true,
    },

    Objet: {
      type: String,
      required: true,
    },
    frais: {
      type: String,
      required: true,
    },
    titre: {
      type: String,
      required: true,
    },
    dateDebut: {
      type: Date,
      required: false,
    },
    dateFin: {
      type: Date,
      required: false,
    },
    assurance: {
      type: {
        type: String,
        required: false,
      },
      cout: {
        type: Number,
        required: false,
      },
      contrat: {
        type: String,
        required: true,
      },
    },
    oeuvre: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Oeuvre",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Pret", pretModel);
