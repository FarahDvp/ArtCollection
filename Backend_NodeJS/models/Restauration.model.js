const mongoose = require("mongoose");

const RestaurationModel = new mongoose.Schema(
  {
    constat: {
      type: String,
      required: true,
    },
    causes: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    lieu: {
      type: String,
      required: true,
    },
    nomRestaurateur: {
      type: String,
      required: true,
    },
    typeIntervention: {
      type: String,
      required: true,
    },
    materiel: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Materiel",
      },
    ],
    techniqueUtilise: {
      type: String,
      required: true,
    },
    oeuvre: {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Oeuvre",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restauration", RestaurationModel);
