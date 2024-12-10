const mongoose = require("mongoose");

const MaterielModel = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Materiel", MaterielModel);
