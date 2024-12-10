const mongoose = require("mongoose");

const BibliographieModel = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    nomAuteur: {
      type: String,
      required: false,
    },
    page: {
      type: String,
      required: false,
    },

    datePublication: {
      type: Date,
      required: false,
    },
    editeur: {
      type: String,
      required: false,
    },
    publication: {
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

module.exports = mongoose.model("Bibliographie", BibliographieModel);
