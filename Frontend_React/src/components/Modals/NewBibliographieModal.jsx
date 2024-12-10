import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
import { addBibliographie } from "../../Feature/bibliographieSlice";
import { getAllMateriel } from "../../Feature/materielSlice";

import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";

export default function NewBibliographieModal() {
  const showBibliographie = useSelector(
    (state) => state.modal.showBibliographie
  );
  const { succes } = useSelector((state) => state.bibliographie);
  const { materielList } = useSelector((state) => state.materiel);
  const { oeuvreId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMateriel());
  }, [dispatch]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [BibliographieInfo, setBibliographieInfo] = useState({
    titre: "",
    nomAuteur: "",
    page: 0,
    datePublication: "",
    editeur: "",
    publication: "",
  });
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    setBibliographieInfo({
      ...BibliographieInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setBibliographieInfo({ ...BibliographieInfo, materiel: options });
  };
  const handleClosee = () => dispatch(handleClose());

  const handleSubmit = async () => {
    try {
      if (selectedOption && selectedOption.length > 0) {
        setFormSubmitted(false);
      } else {
        setFormSubmitted(true);
      }
      const response = dispatch(
        addBibliographie({ _id: oeuvreId, info: BibliographieInfo })
      );
      if (succes) {
        setBibliographieInfo([]);
        const message = "Bibliographie ajouter avec succès";
        Toastfunction.TaostSuccess(message);
        dispatch(handleClose());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={showBibliographie} onClose={handleClose}>
        <Form>
          <DialogTitle>Ajouter un nouveau Bibliographie</DialogTitle>
          <DialogContent>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Titre"
                    name="titre"
                    value={BibliographieInfo.titre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nom de l'auteur</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom de l'auteur"
                    name="nomAuteur"
                    value={BibliographieInfo.nomAuteur}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Page</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Page"
                    name="page"
                    value={BibliographieInfo.page}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Date de publication</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date de publication"
                    name="datePublication"
                    value={BibliographieInfo.datePublication}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Editeur</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Editeur"
                    name="editeur"
                    value={BibliographieInfo.editeur}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Publication</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Publication"
                    name="publication"
                    value={BibliographieInfo.publication}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosee}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Enregistrer
            </Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}
