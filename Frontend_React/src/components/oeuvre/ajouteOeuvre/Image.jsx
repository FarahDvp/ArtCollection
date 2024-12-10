import { Button, Grid, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Form, ErrorMessage } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { handleChange, addOeuvre } from "../../../Feature/oeuvreSlice";

function Image() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.oeuvre.info);
  const [Dimensions, setDimensions] = useState();

  const handleChangeOeuvre = (event) => {
    const { name, value } = event.target;
    dispatch(handleChange({ field: name, value }));
  };
  const [previewSource, setPreviewSource] = useState("");

  const handleChangeImage = async (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
    console.log(file);
    dispatch(handleChange({ field: "url", value: event.target.files[0] }));
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
            Etape 4
          </Typography>{" "}
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Entrer l'image ici </Form.Label>
            <Form.Control
              type="file"
              onChange={handleChangeImage}
              className="form-input"
              required
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ height: "100px" }} />
          )}
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Copyright </Form.Label>
            <Form.Control
              type="text"
              name="copyright"
              className="form-input"
              required
              onChange={handleChangeOeuvre}
              value={info.copyright}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Droit </Form.Label>
            <Form.Control
              type="text"
              name="droit"
              className="form-input"
              required
              onChange={handleChangeOeuvre}
              value={info.droit}
            />
          </Form.Group>
        </Grid>
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date De Sortie </Form.Label>
            <Form.Control
              type="date"
              name="dateSortie"
              className="form-input"
              required
              onChange={handleChangeOeuvre}
              value={info.dateSortie}
            />
          </Form.Group>
        </Grid>{" "}
        <Grid item xs={6} md={6} lg={6}>
          <Form.Group className="mb-3">
            <Form.Label>Autre Information </Form.Label>
            <Form.Control
              type="text"
              name="autreInformation"
              className="form-input"
              required
              onChange={handleChangeOeuvre}
              value={info.autreInformation}
            />
          </Form.Group>
        </Grid>
      </Grid>
    </>
  );
}

export default Image;
