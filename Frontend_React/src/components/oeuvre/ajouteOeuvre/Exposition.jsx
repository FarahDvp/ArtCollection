import React, { useState } from "react";
import { Button, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import Form from "react-bootstrap/Form";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import Temporaire from "./Exposition/Temporaire";
import Permanente from "./Exposition/Permanente";

function Exposition() {
  const [formsPermanante, setFormsPermananate] = useState([]);
  const [formsTempo, setFormsTempo] = useState([]);

  const handleClickPermanante = () => {
    const newForms = [...formsPermanante, formsPermanante.length + 1];
    setFormsPermananate(newForms);
  };
  const handleClickTempo = () => {
    const newForms = [...formsTempo, formsTempo.length + 1];
    setFormsTempo(newForms);
  };
  return (
    <>
      <Grid container>
        <Grid
          item
          xs={3}
          md={3}
          lg={8}
          textAlign="left"
          style={{ paddingBottom: 40 }}
        >
          <Typography variant="h6" color="#3f51b5">
            Etape 3
          </Typography>{" "}
        </Grid>{" "}
        <Grid item xs={6} md={6} lg={2} textAlign="right">
          {" "}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={handleClickTempo}
          >
            {" "}
            temporaire{" "}
          </Button>
        </Grid>
        <Grid item xs={3} md={3} lg={2} textAlign="right">
          {" "}
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={handleClickPermanante}
          >
            {" "}
            permanente{" "}
          </Button>
        </Grid>{" "}
      </Grid>
      {formsPermanante.map((id) => (
        <Permanente key={id} id={id} />
      ))}
      {formsTempo.map((id) => (
        <Temporaire key={id} id={id} />
      ))}

      <Grid conatiner>
        {" "}
        <Grid item xs={6} md={6} lg={12} textAlign="right">
          <Button variant="contained"> Suivant</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Exposition;
