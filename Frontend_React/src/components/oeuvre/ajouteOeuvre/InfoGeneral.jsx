import { Button, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, forwardRef } from "react";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { handleChange } from "../../../Feature/oeuvreSlice";

function InfoGeneral() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.oeuvre.info);
  const [Dimensions, setDimensions] = useState();
  const handleChangeOeuvre = (event) => {
    const { name, value } = event.target;
    dispatch(handleChange({ field: name, value }));
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
            Etape 1
          </Typography>{" "}
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form.Group className="mb-3">
            <Form.Label>Titre d'objet</Form.Label>
            <Form.Control
              required
              type="text"
              name="titre"
              placeholder="Entrer le nom d'oeuvre"
              value={info.titre}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>

        <Grid item xs={6} md={6} lg={4}>
          <Form.Group className="mb-3">
            <Form.Label>Date de Creation</Form.Label>
            <Form.Control
              required
              type="date"
              name="dateDeCreation"
              placeholder="Entrer le date de création"
              value={info.dateDeCreation}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre d'element</Form.Label>
            <Form.Control
              required
              type="number"
              name="nbElement"
              placeholder="Entrer le nombre d'element"
              value={info.nbElement}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form.Group className="mb-3">
            <Form.Label>Numéro de tirage</Form.Label>
            <Form.Control
              required
              type="number"
              name="numeroTirage"
              placeholder="Entrer le numero de tirage"
              value={info.numeroTirage}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>

        <Grid item xs={6} md={6} lg={4}>
          <Form.Group className="mb-3">
            <Form.Label>Type Tirage</Form.Label>
            <Form.Control
              required
              type="text"
              name="typeTirage"
              placeholder="Entrer le type de tirage"
              value={info.typeTirage}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form.Group className="mb-3">
            <Form.Label>Support </Form.Label>
            <Form.Control
              required
              type="text"
              name="support"
              placeholder="Entrer nom du support"
              value={info.support}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Poid </Form.Label>
            <Form.Control
              required
              type="number"
              name="poid"
              value={info.poid}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          <Form.Group className="mb-3">
            <Form.Label>Dimension </Form.Label>
            <Form.Select
              name="dimensions"
              onChange={(e) => setDimensions(e.target.value)}
              value={Dimensions}
              required
            >
              <option value="bidimensionnelles">En bidimensionnelles </option>
              <option value="tridimensionnelles">En tridimensionnelles </option>
            </Form.Select>
          </Form.Group>
        </Grid>

        <Grid item xs={6} md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Hauteur </Form.Label>
            <Form.Control
              required
              type="number"
              name="hauteur"
              value={info.hauteur}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={2}>
          <Form.Group className="mb-3">
            <Form.Label>Largeur </Form.Label>
            <Form.Control
              required
              type="number"
              name="largeur"
              value={info.largeur}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
        {Dimensions === "tridimensionnelles" ? (
          <>
            <Grid item xs={6} md={6} lg={2}>
              <Form.Group className="mb-3">
                <Form.Label>Profondeur </Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="profondeur"
                  value={info.profondeur}
                  onChange={handleChangeOeuvre}
                />
              </Form.Group>
            </Grid>
          </>
        ) : (
          " "
        )}
        <Grid item xs={6} md={6} lg={12}>
          <Form.Group className="mb-3">
            <Form.Label>Description </Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrer une petite description ici "
              as="textarea"
              rows={3}
              name="description"
              required
              value={info.description}
              onChange={handleChangeOeuvre}
            />
          </Form.Group>
        </Grid>
      </Grid>
    </>
  );
}

export default InfoGeneral;
