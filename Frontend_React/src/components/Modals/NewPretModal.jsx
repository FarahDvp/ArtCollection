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
import { addPret } from "../../Feature/pretSlice";
import { getAllMateriel } from "../../Feature/materielSlice";

import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";

export default function NewPretModal() {
  const showPret = useSelector((state) => state.modal.showPret);
  const { succes } = useSelector((state) => state.pret);
  const { oeuvreId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMateriel());
  }, [dispatch]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [PretInfo, setPretInfo] = useState({
    institution: "",
    Objet: "",
    frais: 0,
    lieu: "",
    titre: "",
    dateDebut: "",
    dateFin: "",
    type: "",
    cout: 0,
    contrat: "",
  });
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    setPretInfo({
      ...PretInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setPretInfo({ ...PretInfo, materiel: options });
  };
  const handleClosee = () => dispatch(handleClose());

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = dispatch(addPret({ _id: oeuvreId, info: PretInfo }));
      if (succes) {
        setPretInfo([]);
        const message = "Pret ajouter avec succès";
        Toastfunction.TaostSuccess(message);
        dispatch(handleClose());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={showPret} onClose={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle>Ajouter un nouveau Prêt</DialogTitle>
          <DialogContent>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicInstitution">
                  <Form.Label>Institution</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Institution"
                    name="institution"
                    value={PretInfo.institution}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicObjet">
                  <Form.Label>Objet</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Objet"
                    name="Objet"
                    value={PretInfo.Objet}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicFrais">
                  <Form.Label>Frais</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Frais"
                    name="frais"
                    value={PretInfo.frais}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicLieu">
                  <Form.Label>Lieu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Lieu"
                    name="lieu"
                    value={PretInfo.lieu}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicTitre">
                  <Form.Label>Titre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Titre"
                    name="titre"
                    value={PretInfo.titre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicDateDebut">
                  <Form.Label>Date de début</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date de début"
                    name="dateDebut"
                    value={PretInfo.dateDebut}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicDateFin">
                  <Form.Label>Date de fin</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date de fin"
                    name="dateFin"
                    value={PretInfo.dateFin}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicType">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={PretInfo.type}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicCout">
                  <Form.Label>Cout</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Cout"
                    name="cout"
                    value={PretInfo.cout}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicCout">
                  <Form.Label>Cout</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="contrat"
                    name="contrat"
                    value={PretInfo.contrat}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
            </Row>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosee}>Cancel</Button>
            <Button type="submit">Enregistrer</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </div>
  );
}
