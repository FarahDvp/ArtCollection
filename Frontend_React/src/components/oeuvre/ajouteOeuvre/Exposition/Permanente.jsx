import React from "react";
import { Button, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import Form from "react-bootstrap/Form";

function Permanente() {
  return (
    <>
      <Grid
        className="shadow border  rounded m-1 mb-4 p-3"
        container
        rowSpacing={{ xs: 1, sm: 1, md: 1 }}
      >
        <Grid item xs={3} md={3} lg={12} style={{ paddingBottom: 20 }}>
          <Typography variant="h7" color="#3f51b5">
            Information Expositon Permenanate
          </Typography>{" "}
        </Grid>{" "}
        <Grid item xs={6} md={6} lg={12}>
          <Form.Group className="mb-3" style={{ maxWidth: 538 }}>
            <Form.Label>Lieu d'exposition </Form.Label>
            <Form.Control required type="text" name="titre" />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date de debut </Form.Label>
            <Form.Control required type="date" name="titre" />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Form.Group className="mb-3 mr-3">
            <Form.Label>Date de Fin </Form.Label>
            <Form.Check
              type="radio"
              label="jusqu'a maintenant"
              name="radioGroup"
              id="radio1"
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Form.Label>{"  "} </Form.Label>

          <Form.Group className="mb-3">
            <Form.Control required type="date" name="titre" />
          </Form.Group>
        </Grid>
      </Grid>
    </>
  );
}

export default Permanente;
