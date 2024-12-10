import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Tooltip from "@mui/material/Tooltip";

import {
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NewRestaurationModal from "../../components/Modals/NewRestaurationModal";
import Restauration from "../../components/oeuvre/modifierOeuvre/Restauration";
import Images from "../../components/oeuvre/modifierOeuvre/Images";

import Toast from "../../layouts/Toast/ToastContainer";
import Bibliographie from "../../components/oeuvre/modifierOeuvre/Bibliographie";
import Pret from "../../components/oeuvre/modifierOeuvre/Pret";
import Reserve from "../../components/oeuvre/modifierOeuvre/Reserve";
import Acquisition from "../../components/oeuvre/modifierOeuvre/Acquisition";

function ModifierOeuvre() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Helmet>
        <title> Oeuvre </title>
      </Helmet>
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
          ,
          <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/FondationHasdrubal/oeuvre"
          >
            Détail
          </Link>
          ,
          <Typography key="3" color="text.primary">
            Modifier
          </Typography>
        </Breadcrumbs>

        <>
          <Stack
            className="p-2 rounded shadow-lg"
            sx={{
              backgroundColor: "#1F1B55",
              color: "white",
              marginBottom: 3,
            }}
          >
            <Typography variant="h5">oeuvre Numero 44555</Typography>
          </Stack>
        </>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Restauration" {...a11yProps(0)} />
              <Tab label="Images" {...a11yProps(1)} />
              <Tab label="Bibliographie" {...a11yProps(2)} />
              <Tab label="Reserve" {...a11yProps(2)} />
              <Tab label="Pret" {...a11yProps(2)} />
              <Tab label="Acquistion" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Restauration />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Images />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Bibliographie />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Reserve />
          </TabPanel>{" "}
          <TabPanel value={value} index={4}>
            <Pret />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Acquisition />
          </TabPanel>
        </Box>
      </Container>{" "}
      <NewRestaurationModal />
      <Toast />
    </>
  );
}
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
export default ModifierOeuvre;
