const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./database/connectionDB");
const GeneratePassword = require("./functions/GeneratePassword");
const AllRoutes = require("./routes/AllRoutes.routes");

const corstAllowAll = {
  credentials: true,
  origin: true,
  "Access-Control-Allow-Origin": "*",
};
app.use(cors(corstAllowAll));
app.options("*", cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.listen(process.env.PORT || 8081, () => {
  connectDB();
});

/********** ROUTES  */

app.use("/", AllRoutes);
