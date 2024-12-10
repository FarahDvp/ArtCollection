import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { addOeuvre, handleChange } from "../../../Feature/oeuvreSlice";

function Acquisition() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.oeuvre.info);
  const [certifInput, setCertifInput] = useState("");
  const [preuveInput, setPreuveInput] = useState("");

  const handleChangeOeuvre = (event) => {
    const { name, value } = event.target;
    dispatch(handleChange({ field: name, value }));
  };

  const handleChangeCertif = (event) => {
    const { name, value } = event.target;
    const file = event.target.files[0];

    dispatch(handleChange({ field: "certificat", value: file }));

    setCertifInput(value);
  };

  const handleChangePreuve = (event) => {
    const { name, value } = event.target;
    console.log(value);
    const file = event.target.files[0];
    dispatch(handleChange({ field: "preuveAchat", value: file }));

    setPreuveInput(value);
  };

  return (
    <>
      <Grid
        container
        rowSpacing={{ xs: 1, sm: 1, md: 1 }}
        columnSpacing={{ xs: 1, sm: 2, md: 6 }}
      >
        <Grid item xs={12} md={12} lg={12}>
          {" "}
          <Typography variant="h6" color="#3f51b5">
            {" "}
            Etape 3
          </Typography>{" "}
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Propriétaire actuel</Form.Label>
              <Form.Control
                required
                type="text"
                name="proprietaireActuel"
                placeholder="Entrer le nom propriétaire Actuel"
                onChange={handleChangeOeuvre}
                value={info.proprietaireActuel}
              />
            </Form.Group>
          </Form>
        </Grid>

        <Grid item xs={6} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Lieu d'acquisition</Form.Label>
              <Form.Control
                required
                type="text"
                name="lieuAcquisition"
                placeholder="Entrer le lieu Acquisition"
                onChange={handleChangeOeuvre}
                value={info.lieuAcquisition}
              />
            </Form.Group>
          </Form>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Date d'acquisition</Form.Label>
              <Form.Control
                required
                type="date"
                name="dateAcquisition"
                placeholder="Entrer le nom d'oeuvre"
                onChange={handleChangeOeuvre}
                value={info.dateAcquisition}
              />
            </Form.Group>
          </Form>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Prix Acquisition</Form.Label>
              <Form.Control
                required
                type="number"
                name="prixAcquisition"
                placeholder="Entrer le nom d'oeuvre"
                onChange={handleChangeOeuvre}
                value={info.prixAcquisition}
              />
            </Form.Group>
          </Form>
        </Grid>

        <Grid item xs={6} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>moyen Acquisition</Form.Label>
              <Form.Select
                name="moyenAcquisition"
                required
                onChange={handleChangeOeuvre}
              >
                <option value="Achat">Achat </option>
                <option value="Don">Don</option>
                <option value="Legs">Legs</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3 ">
              <Form.Label>Preuve d'achat </Form.Label>
              <Form.Control
                required
                type="file"
                name="preuveAchat"
                onChange={handleChangePreuve}
                value={preuveInput}
              />
            </Form.Group>
          </Form>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Certificat </Form.Label>
              <Form.Control
                onChange={handleChangeCertif}
                required
                type="file"
                name="certificat"
              />
            </Form.Group>
          </Form>
        </Grid>
      </Grid>
    </>
  );
}

export default Acquisition;
