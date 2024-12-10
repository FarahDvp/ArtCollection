const mongoose = require("mongoose");

const expositionModel = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Permanente", "Temporaire"],
      default: "Permanente",
    },
    lieu: {
      type: String,
      required: true,
    },
    contrainte: {
      type: String, //required lel temporaire khw
      required: false,
    },
    titre: {
      type: String,
      required: true, //required lel temporaire khw
    },
    dateDebut: {
      type: Date, //required lel permanente
      required: true,
    },
    dateFin: {
      type: Date,
      required: false, //required lel temporaire khw
    },
    autreInfo: {
      type: String,
      required: false, //required lel temporaire khw
    },
    oeuvre: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Oeuvre",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Exposition", expositionModel);
