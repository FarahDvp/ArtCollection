const mongoose = require("mongoose");

const imageModel = new mongoose.Schema(
  {
    url: {
      type: String,
      required: false,
    },
    copyright: {
      type: String,
      required: false,
    },
    droit: {
      type: String,
      required: false,
    },

    dateSortie: {
      type: Date,
      required: false,
    },
    autreInformation: {
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

module.exports = mongoose.model("Image", imageModel);
