import React from "react";
import { Button, Grid, Typography, AppBar, Toolbar } from "@mui/material";
import Form from "react-bootstrap/Form";

function Temporaire() {
  return (
    <Grid className="shadow border  rounded m-1 mb-4 p-3" container>
      <Grid item xs={3} md={3} lg={12} style={{ paddingBottom: 20 }}>
        <Typography variant="h7" color="#3f51b5">
          Information Expositon Temporaire
        </Typography>{" "}
      </Grid>{" "}
      <Grid item xs={6} md={6} lg={6}>
        <Form.Group className="mb-3" style={{ maxWidth: 538 }}>
          <Form.Label>Titre de l'exposition </Form.Label>
          <Form.Control required type="text" name="titre" />
        </Form.Group>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
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
      <Grid item xs={6} md={6} lg={6}>
        <Form.Label>Date de fin </Form.Label>
        <Form.Group className="mb-3">
          <Form.Control required type="date" name="titre" />
        </Form.Group>
      </Grid>
      <Grid item xs={6} md={6} lg={12}>
        <Form.Label>Autre Information </Form.Label>
        <Form.Control
          type="text"
          placeholder="Entrer une petite description ici "
          as="textarea"
          rows={3}
          name="description"
          required
        />
      </Grid>
    </Grid>
  );
}

export default Temporaire;
