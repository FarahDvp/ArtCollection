import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { handleClose } from "../../Feature/modalSlice";
import { addAdmin } from "../../Feature/userSlice";
import "./modalStyle.css";
import Notification from "../../layouts/notification/Notification";

export default function NewAdminModal() {
  const show = useSelector((state) => state.modal.show);
  const succes = useSelector((state) => state.user.succes);

  const dispatch = useDispatch();

  const handleClosee = () => dispatch(handleClose());

  const [adminInfo, setAdminInfo] = useState({
    nom: "",
    prenom: "",
    userName: "",
    email: "",
    phoneNumber: "",
    sex: "",
  });

  const handleChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const response = dispatch(addAdmin(adminInfo));
      if (succes) {
        dispatch(handleClose());
        setAdminInfo([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Ajouter Nouveau Admin</DialogTitle>
        <DialogContent>
          <Row>
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nom"
                  name="nom"
                  value={adminInfo.nom}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nom"
                  name="prenom"
                  value={adminInfo.prenom}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nom d'utilisateur</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nom d'utilisateur"
                  name="userName"
                  value={adminInfo.userName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="nom"
                  name="email"
                  value={adminInfo.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Numéro de telephone</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="nom"
                  name="phoneNumber"
                  value={adminInfo.phoneNumber}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Label>Genre </Form.Label>
              <Form.Select name="sex" required onChange={handleChange}>
                <option value="Femme">Femme </option>
                <option value="Homme">Homme</option>
              </Form.Select>
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
