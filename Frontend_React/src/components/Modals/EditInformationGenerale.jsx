import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, Avatar } from "@mui/material";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { handleClose } from "../../Feature/modalSlice";
import { editOeuvre } from "../../Feature/oeuvreSlice";
import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";
import { countries } from "../../utils/countries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function EditInformationGenerale({ oeuvre }) {
  const dispatch = useDispatch();
  const { showInfoGeneral } = useSelector((state) => state.modal);
  const { succes } = useSelector((state) => state.oeuvre);
  const { materielList } = useSelector((state) => state.materiel);

  const [OeuvreInfo, setOeuvreInfo] = useState({
    titre: oeuvre.titre,
    categorie: "",
    description: "",
    poid: 0,
    dateDeCreation: "",
    typeTirage: "",
    numeroTirage: 0,
    support: "",
    hauteur: 0,
    profondeur: 0,
    largeur: 0,
    nbElement: 0,

    materiel: [],

    localisationSurOeuvre: "",
    descriptionSignature: "",
  });
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    setOeuvreInfo({
      titre: oeuvre.titre,
      categorie: oeuvre.categorie && oeuvre.categorie.nom,
      description: oeuvre.description,
      poid: oeuvre.poid,

      dateDeCreation: oeuvre.dateDeCreation
        ? new Date(oeuvre.dateDeCreation).toISOString().substr(0, 10)
        : "",
      typeTirage: oeuvre.typeTirage,
      numeroTirage: oeuvre.numeroTirage,
      support: oeuvre.support,
      hauteur: oeuvre.dimension && oeuvre.dimension.hauteur,
      profondeur: oeuvre.dimension && oeuvre.dimension.profondeur,
      largeur: oeuvre.dimension && oeuvre.dimension.largeur,
      nbElement: oeuvre.nbElement,

      localisationSurOeuvre: oeuvre.localisationSurOeuvre,
      descriptionSignature: oeuvre.descriptionSignature,
    });
    setSelectedOption(oeuvre.materiel);
  }, [oeuvre]);

  const handleClosee = () => {
    dispatch(handleClose());

    setSelectedOption(oeuvre.materiel);
  };
  const handleChange = (event) => {
    setOeuvreInfo({ ...OeuvreInfo, [event.target.name]: event.target.value });
  };
  const formData = new FormData();

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setOeuvreInfo({ ...OeuvreInfo, materiel: options });

    console.log(OeuvreInfo);
  };
  const handleSubmit = async () => {
    try {
      const id = oeuvre._id;
      console.log(OeuvreInfo);
      const response = dispatch(
        editOeuvre({ id, info: formData, OeuvreIn: OeuvreInfo })
      );
      console.log(response);
      if (succes) {
        dispatch(handleClose());
        const message = "Oeuvree modifier avec succès";
        Toastfunction.TaostSuccess(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <Dialog open={showInfoGeneral} onClose={handleClose}>
        <DialogTitle>Modifier l'Oeuvree</DialogTitle>
        <DialogContent>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Titre"
                  name="titre"
                  defaultValue={OeuvreInfo.titre}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Catégorie</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Catégorie"
                  name="categorie"
                  defaultValue={OeuvreInfo.categorie}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  name="description"
                  defaultValue={OeuvreInfo.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Poids</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Poids"
                  name="poids"
                  defaultValue={OeuvreInfo.poids}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Date de création</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date de création"
                  name="dateDeCreation"
                  defaultValue={
                    OeuvreInfo.dateDeCreation
                      ? new Date(OeuvreInfo.dateDeCreation)
                          .toISOString()
                          .substr(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Type de tirage</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Type de tirage"
                  name="typeTirage"
                  defaultValue={OeuvreInfo.typeTirage}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Numéro de tirage</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Numéro de tirage"
                  name="numeroTirage"
                  defaultValue={OeuvreInfo.numeroTirage}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Support</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Support"
                  name="support"
                  defaultValue={OeuvreInfo.support}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hauteur</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Hauteur"
                  name="hauteur"
                  defaultValue={OeuvreInfo.hauteur}
                  onChange={handleChange}
                />{" "}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Profondeur</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="profondeur"
                  name="profondeur"
                  defaultValue={OeuvreInfo.profondeur}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Largeur</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="largeur"
                  name="largeur"
                  defaultValue={OeuvreInfo.largeur}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nombre d'éléments</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="nombre d'éléments"
                  name="nbElement"
                  defaultValue={OeuvreInfo.nbElement}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>localisation Sur Oeuvre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="localisation Sur Oeuvre"
                  name="localisationSurOeuvre"
                  defaultValue={OeuvreInfo.localisationSurOeuvre}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>description Signature</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description Signature"
                  name="descriptionSignature"
                  defaultValue={OeuvreInfo.descriptionSignature}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              <Autocomplete
                value={selectedOption || oeuvre.materiel}
                size="small"
                multiple
                options={materielList}
                disableCloseOnSelect
                getOptionLabel={(option) => option.nom}
                renderOption={(props, option, { selected }) => {
                  return (
                    <li {...props}>
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        {option.nom}
                      </Box>
                    </li>
                  );
                }}
                style={{ width: 250 }}
                onChange={handleOptionSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Checkboxes"
                    placeholder="Favorites"
                  />
                )}
              />
            </Col>{" "}
          </Row>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosee}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
