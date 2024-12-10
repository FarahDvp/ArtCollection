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
import InformationGenerale from "../../components/oeuvre/modifierOeuvre/InformationGenerale";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  border: "1px solid rgba(75, 75, 75, 0.267)",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
}));

const StyledIconButton = styled(IconButton)({
  boxShadow: "0px 4px 6px gray",
  transition: "transform 0.5s ease-out",
  marginLeft: 10,

  "&:hover": {
    transform: "scale(1.1)",
  },
});
function Oeuvre() {
  const { oeuvreId } = useParams();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  const handleNavigateModifier = () => {
    navigate(`/FondationHasdrubal/oeuvre/${oeuvreId}/modifier`);
  };
  return (
    <>
      <Helmet>
        <title> Oeuvre </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link
              underline="hover"
              key="1"
              color="inherit"
              to="/FondationHasdrubal/oeuvre"
            >
              Oeuvres
            </Link>
            ,
            <Typography key="3" color="text.primary">
              Détail
            </Typography>
          </Breadcrumbs>
          <Box>
            <Tooltip title="Modifier">
              <span>
                <StyledIconButton
                  aria-label="modifier"
                  onClick={handleNavigateModifier}
                >
                  <BorderColorIcon />
                </StyledIconButton>
              </span>
            </Tooltip>
            <Tooltip title="Telecharger">
              <span>
                <StyledIconButton aria-label="telecharger">
                  <VerticalAlignBottomIcon />
                </StyledIconButton>{" "}
              </span>
            </Tooltip>
          </Box>
        </Stack>

        <>
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
            <>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12} md={4}>
                  <Item
                    sx={{
                      height: 450,
                      //  backgroundImage: `url(${a.image.url})`,
                      backgroundImage: `url(https://res.cloudinary.com/duchnti5k/image/upload/v1674698194/art_collection/ux8zigjyq49o9rrsjeci.jpg)`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    {" "}
                  </Item>
                </Grid>
                <Grid item xs={12} md={8}>
                  <InformationGenerale />
                </Grid>

                <Grid item xs={12} md={12} mt={5}>
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
                  <NewRestaurationModal />
                  <Toast />
                </Grid>
              </Grid>
            </>
          </>
        </>
      </Container>{" "}
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
        <Box sx={{ pt: 3 }}>
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
export default Oeuvre;
