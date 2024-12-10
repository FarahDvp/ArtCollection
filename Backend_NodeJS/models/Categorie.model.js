const mongoose = require("mongoose");

const CategorieModel = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categorie", CategorieModel);
