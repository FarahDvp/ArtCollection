import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Container } from "@mui/system";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import InfoGeneral from "../../components/oeuvre/ajouteOeuvre/InfoGeneral";
import InfoSpecifique from "../../components/oeuvre/ajouteOeuvre/InfoSpecifique";
import Acquisition from "../../components/oeuvre/ajouteOeuvre/Acquisition";
import Exposition from "../../components/oeuvre/ajouteOeuvre/Exposition";
import Image from "../../components/oeuvre/ajouteOeuvre/Image";
import { addOeuvre } from "../../Feature/oeuvreSlice";
import Toastfunction from "../../utils/ToastFunction";
import Toast from "../../layouts/Toast/ToastContainer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NouveauOeuvre() {
  const [tabDisabled, setTabDisabled] = useState(true);
  const dispatch = useDispatch();
  const { info, succes, loading } = useSelector((state) => state.oeuvre);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    setValue(value + 1);
  };

  const handlePrev = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    }
  };
  const isTabValidated = (tabIndex) => {
    return value >= tabIndex ? (
      <CheckCircleOutlineOutlinedIcon />
    ) : (
      <CircleOutlinedIcon />
    );
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();

      data.append("titre", info.titre);
      data.append("categorie", info.categorie);
      data.append("etat", info.etat);
      data.append("artiste", info.artiste);
      data.append("description", info.description);
      data.append("poid", info.poid);
      data.append("dateDeCreation", info.dateDeCreation);
      data.append("typeTirage", info.typeTirage);
      data.append("numeroTirage", info.numeroTirage);
      data.append("support", info.support);
      data.append("hauteur", info.hauteur);
      data.append("profondeur", info.profondeur);
      data.append("largeur", info.largeur);
      data.append("nbElement", info.nbElement);
      data.append("proprietaireActuel", info.proprietaireActuel);
      data.append("lieuAcquisition", info.lieuAcquisition);
      data.append("dateAcquisition", info.dateAcquisition);
      data.append("prixAcquisition", info.prixAcquisition);
      data.append("moyenAcquisition", info.moyenAcquisition);
      data.append("preuveAchat", info.preuveAchat);
      data.append("certificat", info.certificat);
      data.append("placeDansLeDepot", info.placeDansLeDepot);
      data.append("modeDeStockage", info.modeDeStockage);
      info.materiel.forEach((item) => data.append("materiel[]", item));
      data.append("url", info.url);
      data.append("copyright", info.copyright);
      data.append("droit", info.droit);
      data.append("dateSortie", info.dateSortie);
      data.append("autreInformation", info.autreInformation);
      data.append("localisationSurOeuvre", info.localisationSurOeuvre);
      data.append("descriptionSignature", info.descriptionSignature);
      if (loading === true) {
        const message = "Oeuvre en cours d'ajoute";
        Toastfunction.TaostLoading(message);
      }
      const response = dispatch(addOeuvre(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Breadcrumbs separator="›" aria-label="breadcrumb" mb={2}>
        <Link
          underline="hover"
          key="1"
          color="inherit"
          to="/FondationHasdrubal/oeuvre"
        >
          Oeuvres
        </Link>

        <Typography key="3" color="text.primary">
          Nouvelle
        </Typography>
      </Breadcrumbs>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <div>
                  {" "}
                  {isTabValidated(1)}
                  <span className="m-1 "> Informations Générales </span>{" "}
                </div>
              }
              {...a11yProps(0)}
              sx={{
                "&.Mui-selected": { color: "#fff", backgroundColor: "#3f51b5" },
              }}
              disabled={tabDisabled}
              {...(value === 0 && { disabled: false })}
              {...(value === 0 && { disabled: false })}
            />
            <Tab
              label={
                <div>
                  {" "}
                  {isTabValidated(2)}{" "}
                  <span className="m-1 "> Informations Spécifiques </span>{" "}
                </div>
              }
              {...a11yProps(2)}
              sx={{
                "&.Mui-selected": { color: "#fff", backgroundColor: "#3f51b5" },
              }}
              {...(value === 1 && { disabled: false })}
              {...(value !== 1 && { disabled: true })}
            />
            <Tab
              label={
                <div>
                  {" "}
                  {isTabValidated(3)} <span className="m-1 "> Acquisition</span>
                </div>
              }
              {...a11yProps(1)}
              sx={{
                "&.Mui-selected": { color: "#fff", backgroundColor: "#3f51b5" },
              }}
              {...(value === 2 && { disabled: false })}
              {...(value !== 2 && { disabled: true })}
            />
            <Tab
              label={
                <div>
                  {" "}
                  {isTabValidated(3)} <span className="m-1 "> Image</span>
                </div>
              }
              {...a11yProps(1)}
              sx={{
                "&.Mui-selected": { color: "#fff", backgroundColor: "#3f51b5" },
              }}
              {...(value === 2 && { disabled: false })}
              {...(value !== 2 && { disabled: true })}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Form onSubmit={(e) => handleNext(e)}>
            <InfoGeneral />
            <Grid item xs={6} md={6} lg={12} textAlign="right">
              <Button
                className="m-2"
                onClick={handlePrev}
                disabled={value === 0}
                variant="contained"
              >
                {" "}
                Precedent
              </Button>
              <Button
                className="m-3"
                disabled={value === 2}
                variant="contained"
                type="submit"
              >
                {" "}
                Suivant
              </Button>
            </Grid>
          </Form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Form onSubmit={(e) => handleNext(e)}>
            <InfoSpecifique />
            <Grid item xs={6} md={6} lg={12} textAlign="right">
              <Button
                className="m-2"
                onClick={handlePrev}
                disabled={value === 0}
                variant="contained"
              >
                {" "}
                Precedent
              </Button>
              <Button
                className="m-3"
                disabled={value === 2}
                variant="contained"
                type="submit"
              >
                {" "}
                Suivant
              </Button>
            </Grid>
          </Form>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Form onSubmit={(e) => handleNext(e)}>
            <Acquisition />
            <Grid item xs={6} md={6} lg={12} textAlign="right">
              <Button
                className="m-2"
                onClick={handlePrev}
                disabled={value === 0}
                variant="contained"
              >
                {" "}
                Precedent
              </Button>
              <Button
                className="m-3"
                disabled={value === 3}
                variant="contained"
                type="submit"
              >
                {" "}
                Suivant
              </Button>
            </Grid>
          </Form>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Image />
            <Grid item xs={6} md={6} lg={12} textAlign="right">
              <Button
                className="m-2"
                onClick={handlePrev}
                disabled={value === 0}
                variant="contained"
              >
                {" "}
                Precedent
              </Button>
              <Button
                className="m-3"
                disabled={value === 2}
                variant="contained"
                type="submit"
              >
                {" "}
                Enregistrer
              </Button>
            </Grid>
          </Form>
        </TabPanel>
      </Box>

      <Toast />
    </Container>
  );
}
