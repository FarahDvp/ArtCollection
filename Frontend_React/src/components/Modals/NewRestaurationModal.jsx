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
import { addRestauration } from "../../Feature/restaurationSlice";
import { getAllMateriel } from "../../Feature/materielSlice";

import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";
import { countries } from "../../utils/countries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function NewRestaurationModal() {
  const show = useSelector((state) => state.modal.show);
  const { succes } = useSelector((state) => state.restauration);
  const { materielList } = useSelector((state) => state.materiel);
  const { oeuvreId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMateriel());
  }, [dispatch]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [RestaurationInfo, setRestaurationInfo] = useState({
    constat: "",
    causes: "",
    date: "",
    lieu: "",
    nomRestaurateur: "",
    typeIntervention: "",
    techniqueUtilise: "",
    materiel: [],
  });
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    setRestaurationInfo({
      ...RestaurationInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setRestaurationInfo({ ...RestaurationInfo, materiel: options });
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
        addRestauration({ _id: oeuvreId, info: RestaurationInfo })
      );
      if (succes) {
        setRestaurationInfo([]);
        const message = "Restauration ajouter avec succès";
        Toastfunction.TaostSuccess(message);
        dispatch(handleClose());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <Form>
          <DialogTitle>Ajouter un nouveau Restauration</DialogTitle>
          <DialogContent>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Constat</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="conctat"
                    name="constat"
                    value={RestaurationInfo.constat}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Causes</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="causes"
                    name="causes"
                    value={RestaurationInfo.causes}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="entrer date"
                    name="date"
                    value={RestaurationInfo.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Lieu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="lieu"
                    name="lieu"
                    value={RestaurationInfo.lieu}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nom du restaurateur</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="nom du restaurateur"
                    name="nomRestaurateur"
                    value={RestaurationInfo.nomRestaurateur}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Type d'intervention</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="type d'intervention"
                    name="typeIntervention"
                    value={RestaurationInfo.typeIntervention}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Technique utilisée</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="technique utilisée"
                    name="techniqueUtilise"
                    value={RestaurationInfo.techniqueUtilise}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Matériel</Form.Label>

                  <Autocomplete
                    required
                    size="small"
                    multiple
                    options={materielList}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.nom}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          {option.nom}
                        </Box>
                      </li>
                    )}
                    style={{ width: 250 }}
                    onChange={handleOptionSelect}
                    value={selectedOption}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Materiel"
                        placeholder="Materiel"
                        required
                      />
                    )}
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
