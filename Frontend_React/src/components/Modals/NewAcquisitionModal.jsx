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
import { addAcquisition } from "../../Feature/acquisitionSlice";
import { getAllMateriel } from "../../Feature/materielSlice";

import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";
import { countries } from "../../utils/countries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function NewAcquisitionModal() {
  const showAcquisition = useSelector((state) => state.modal.showAcquisition);
  const { succes } = useSelector((state) => state.acquisition);
  const { materielList } = useSelector((state) => state.materiel);
  const { oeuvreId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMateriel());
  }, [dispatch]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [AcquisitionInfo, setAcquisitionInfo] = useState({
    proprietaireActuel: "",
    lieuAcquisition: "",
    dateAcquisition: "",
    prixAcquisition: 0,
    moyenAcquisition: "",
    preuveAchat: null,
    certificat: null,
  });

  const handleChange = (event) => {
    setAcquisitionInfo({
      ...AcquisitionInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleClosee = () => dispatch(handleClose());

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("proprietaireActuel", AcquisitionInfo.proprietaireActuel);
      formData.append("lieuAcquisition", AcquisitionInfo.lieuAcquisition);
      formData.append("dateAcquisition", AcquisitionInfo.dateAcquisition);
      formData.append("prixAcquisition", AcquisitionInfo.prixAcquisition);
      formData.append("moyenAcquisition", AcquisitionInfo.moyenAcquisition);
      formData.append("preuveAchat", AcquisitionInfo.preuveAchat);
      formData.append("certificat", AcquisitionInfo.certificat);
      const response = dispatch(
        addAcquisition({ _id: oeuvreId, info: formData })
      );
      if (succes) {
        setAcquisitionInfo([]);
        const message = "Acquisition ajouter avec succès";
        Toastfunction.TaostSuccess(message);
        dispatch(handleClose());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setAcquisitionInfo({
      ...AcquisitionInfo,
      [event.target.name]: file,
    });
  };

  return (
    <div>
      <Dialog open={showAcquisition} onClose={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle>Ajouter un nouveau Acquisition</DialogTitle>
          <DialogContent>
            <Form.Group className="mb-3" controlId="proprietaireActuel">
              <Form.Label>Propriétaire Actuel</Form.Label>
              <Form.Control
                type="text"
                placeholder="propriétaire actuel"
                name="proprietaireActuel"
                value={AcquisitionInfo.proprietaireActuel}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="lieuAcquisition">
                  <Form.Label>Lieu d'acquisition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="lieu d'acquisition"
                    name="lieuAcquisition"
                    value={AcquisitionInfo.lieuAcquisition}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="dateAcquisition">
                  <Form.Label>Date d'acquisition</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="date d'acquisition"
                    name="dateAcquisition"
                    value={AcquisitionInfo.dateAcquisition}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="prixAcquisition">
                  <Form.Label>Prix d'acquisition</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="prix d'acquisition"
                    name="prixAcquisition"
                    value={AcquisitionInfo.prixAcquisition}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="moyenAcquisition">
                  <Form.Label>Moyen d'acquisition</Form.Label>
                  <Form.Select
                    name="moyenAcquisition"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choisissez une option</option>
                    <option value="Achat"> Achat</option>
                    <option value="Don">Don</option>
                    <option value="Legs">Legs</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="preuveAchat">
              <Form.Label>Preuve d'achat</Form.Label>
              <Form.Control
                type="file"
                name="preuveAchat"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="certificat">
              <Form.Label>Certificat</Form.Label>
              <Form.Control
                type="file"
                name="certificat"
                onChange={handleFileChange}
              />
            </Form.Group>
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
