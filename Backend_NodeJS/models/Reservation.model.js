const mongoose = require("mongoose");

const reservationModel = new mongoose.Schema(
  {
    lieu: {
      type: String,
      required: true,
    },

    placeDansLeDepot: {
      type: String,
      required: true,
    },
    modeDeStockage: {
      type: String,
      enum: ["Accrochée", "Posée au sol", "Roulée", "Rayonnage", "Emballée"],
      required: true,
    },
    emballee: {
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

module.exports = mongoose.model("Reservation", reservationModel);
