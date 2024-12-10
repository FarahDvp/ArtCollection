const express = require("express");
const router = express.Router();
const UserRoute = require("./User.routes");
const OeuvreRoute = require("./Oeuvre.routes");
const ExpositionRoute = require("./Exposition.routes");
const ArtisteRoute = require("./Artiste.routes");
const CategorieRoute = require("./Categorie.routes");
const AcquisitionRoute = require("./Acquisition.routes");
const BibliographieRoute = require("./Bibliographie.routes");
const MaterielRoute = require("./Materiel.routes");
const ReservationRoute = require("./Reservation.routes");
const RestaurationRoute = require("./Restauration.routes");
const PretRoute = require("./Pret.routes");
const ImageRoute = require("./Image.routes");

router.use("/user", UserRoute);
router.use("/oeuvre", OeuvreRoute);
router.use("/exposition", ExpositionRoute);
router.use("/artiste", ArtisteRoute);
router.use("/categorie", CategorieRoute);
router.use("/acquisition", AcquisitionRoute);
router.use("/bibliographie", BibliographieRoute);
router.use("/materiel", MaterielRoute);
router.use("/reserve", ReservationRoute);
router.use("/restauration", RestaurationRoute);
router.use("/pret", PretRoute);
router.use("/image", ImageRoute);

module.exports = router;
