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
import { addReserve } from "../../Feature/reserveSlice";
import { getAllMateriel } from "../../Feature/materielSlice";

import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";
import { countries } from "../../utils/countries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function NewReserveModal() {
  const showReserve = useSelector((state) => state.modal.showReserve);
  const { succes } = useSelector((state) => state.reserve);
  const { materielList } = useSelector((state) => state.materiel);
  const { oeuvreId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMateriel());
  }, [dispatch]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ReserveInfo, setReserveInfo] = useState({
    lieu: "",
    placeDansLeDepot: "",
    modeDeStockage: "",
    emballee: "",
  });
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    setReserveInfo({
      ...ReserveInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setReserveInfo({ ...ReserveInfo, materiel: options });
  };
  const handleClosee = () => dispatch(handleClose());

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = dispatch(
        addReserve({ _id: oeuvreId, info: ReserveInfo })
      );
      if (succes) {
        setReserveInfo([]);
        const message = "Reserve ajouter avec succès";
        Toastfunction.TaostSuccess(message);
        dispatch(handleClose());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={showReserve} onClose={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle>Ajouter un nouveau Reserve</DialogTitle>
          <DialogContent>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Lieu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="lieu"
                    name="lieu"
                    value={ReserveInfo.lieu}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Place dans le depot</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="place dans le depot"
                    name="placeDansLeDepot"
                    value={ReserveInfo.placeDansLeDepot}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Emballee</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="emballee"
                    name="emballee"
                    value={ReserveInfo.emballee}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mode de Stockage</Form.Label>
                  <Form.Select
                    name="modeDeStockage"
                    value={ReserveInfo.modeDeStockage}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choisissez une option</option>
                    <option value="Accrochée"> Accrochée</option>
                    <option value="Posée au sol">Posée au sol</option>
                    <option value="Rayonnage">Rayonnage</option>
                    <option value="Emballée">Emballée</option>
                  </Form.Select>
                </Form.Group>
              </Col>
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
