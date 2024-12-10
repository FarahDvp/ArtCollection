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
import { addImages } from "../../Feature/imagesSlice";
import { getAllMateriel } from "../../Feature/materielSlice";

import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";
import { countries } from "../../utils/countries";

export default function NewImageModal() {
  const { showImage } = useSelector((state) => state.modal);
  const { succes, loading } = useSelector((state) => state.image);
  const { materielList } = useSelector((state) => state.materiel);
  const { oeuvreId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (succes) {
      const message = "Image ajouter avec succès";
      Toastfunction.TaostSuccess(message);
      dispatch(handleClose());
      setImageInfo([]);
    }
  }, [succes]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ImageInfo, setImageInfo] = useState({
    copyright: "",
    droit: "",
    dateSortie: "",
    autreInformation: "",
    image: null,
  });
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    setImageInfo({
      ...ImageInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setImageInfo({ ...ImageInfo, materiel: options });
  };
  const handleClosee = () => dispatch(handleClose());

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("copyright", ImageInfo.copyright);
      formData.append("droit", ImageInfo.droit);
      formData.append("dateSortie", ImageInfo.dateSortie);
      formData.append("autreInformation", ImageInfo.autreInformation);
      formData.append("image", ImageInfo.image);

      dispatch(addImages({ _id: oeuvreId, info: formData }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeImage = (event) => {
    setImageInfo({
      ...ImageInfo,
      image: event.target.files[0],
    });
  };

  return (
    <div>
      <Dialog open={showImage} onClose={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <DialogTitle>Ajouter un nouveau Image</DialogTitle>
          <DialogContent>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Copiright</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter copyright"
                    name="copyright"
                    value={ImageInfo.copyright}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Droit</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter droit"
                    name="droit"
                    value={ImageInfo.droit}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Date De Sortie</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateSortie"
                    value={ImageInfo.dateSortie}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Autre information</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter autre information"
                    name="autreInformation"
                    value={ImageInfo.autreInformation}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>{" "}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleChangeImage}
                    accept="image/*"
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
