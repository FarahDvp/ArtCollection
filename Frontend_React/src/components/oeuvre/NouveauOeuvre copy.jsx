import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Container } from "@mui/system";
import InfoGeneral from "./ajouteOeuvre/InfoGeneral";
import InfoSpecifique from "./ajouteOeuvre/InfoSpecifique";
import Acquisition from "./ajouteOeuvre/Acquisition";
import Exposition from "./ajouteOeuvre/Exposition";
import Image from "./ajouteOeuvre/Image";

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
  const [value, setValue] = React.useState(0);
  const [isTabDisabled, setIsTabDisabled] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label=" Informations Générales"
              icon={<CheckCircleOutlineOutlinedIcon />}
              {...a11yProps(0)}
              sx={{
                "&.Mui-selected": { color: "#fff", backgroundColor: "#3f51b5" },
              }}
            />
            <Tab
              label="Informations Spécifiques"
              icon={<CircleOutlinedIcon />}
              {...a11yProps(2)}
              sx={{
                "&.Mui-selected": { color: "#fff", backgroundColor: "#3f51b5" },
              }}
            />
            <Tab
              icon={<CircleOutlinedIcon />}
              label="Acquisition"
              {...a11yProps(1)}
              sx={{
                "&.Mui-selected": { color: "#fff", backgroundColor: "#3f51b5" },
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <InfoGeneral />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <InfoSpecifique />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Acquisition />
        </TabPanel>
      </Box>
    </Container>
  );
}
