import { Button, Grid, Typography, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import ClearIcon from "@mui/icons-material/Clear";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import { useSelector, useDispatch } from "react-redux";
import { handleChange } from "../../../Feature/oeuvreSlice";
import { getAllMateriel, addMateriel } from "../../../Feature/materielSlice";
import { getAllCategorie } from "../../../Feature/categorieSlice";
import { getAllArtiste } from "../../../Feature/artisteSlice";

function InfoSpecifique() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const info = useSelector((state) => state.oeuvre.info);

  const dispatch = useDispatch();
  const materielList = useSelector((state) => state.materiel.materielList);
  const CategorieList = useSelector((state) => state.categorie.CategorieList);
  const artisteList = useSelector((state) => state.artiste.artisteList);

  const [maleterielSelected, setmaleterielSelected] = useState();

  const handleChangeOeuvre = (event) => {
    const { name, value } = event.target;
    if (event.target.options) {
      const options = event.target.options;
      const selectedValues = [];
      for (let i = 0; i < options.length; i += 1) {
        if (options[i].selected) {
          selectedValues.push(options[i].value);
        }
      }
      setmaleterielSelected(selectedValues);
      dispatch(handleChange({ field: name, value: selectedValues }));
    } else {
      dispatch(handleChange({ field: name, value }));
    }
  };

  useEffect(() => {
    dispatch(getAllMateriel());
    dispatch(getAllCategorie());
    dispatch(getAllArtiste());
  }, [dispatch]);

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
            Etape 2
          </Typography>{" "}
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Matériaux utilisé</Form.Label>
            <Form.Select
              multiple
              name="materiel"
              required
              onChange={handleChangeOeuvre}
            >
              {materielList &&
                materielList.map((m) => <option value={m.nom}>{m.nom}</option>)}
              <option value="autre">Autre</option>
            </Form.Select>
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Grid container item spacing={3}>
            {maleterielSelected &&
              maleterielSelected.map((item) => (
                <Chip label={item} onDelete={handleChange} sx={{ margin: 1 }} />
              ))}
          </Grid>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Categorie </Form.Label>

              <Form.Select
                name="categorie"
                required
                onChange={handleChangeOeuvre}
              >
                {CategorieList &&
                  CategorieList.map((item) => (
                    <option value={item.nom}>{item.nom}</option>
                  ))}
                <option value="Autre">Autre </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Artiste </Form.Label>
              <Form.Select
                name="artiste"
                required
                onChange={handleChangeOeuvre}
              >
                {artisteList &&
                  artisteList.map((item) => (
                    <option value={item.nom}>{item.nom} </option>
                  ))}
                <option value="Autre">Autre </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Grid>

        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>localisationSurOeuvre </Form.Label>
            <Form.Control
              type="text"
              name="localisationSurOeuvre"
              className="form-input"
              required
              onChange={handleChangeOeuvre}
              value={info.localisationSurOeuvre}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>descriptionSignature </Form.Label>
            <Form.Control
              type="text"
              name="descriptionSignature"
              className="form-input"
              required
              onChange={handleChangeOeuvre}
              value={info.descriptionSignature}
            />
          </Form.Group>
        </Grid>
      </Grid>{" "}
    </>
  );
}

export default InfoSpecifique;
