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
import { addArtist } from "../../Feature/artisteSlice";
import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";
import { countries } from "../../utils/countries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function NewArtistModal() {
  const show = useSelector((state) => state.modal.show);
  const succes = useSelector((state) => state.artiste.succes);

  const dispatch = useDispatch();

  const handleClosee = () => dispatch(handleClose());
  const [artistInfo, setArtistInfo] = useState({
    nom: "",
    prenom: "",
    biographie: "",
    lieuNaissance: "",
    dateNaissance: "",
    dateDece: "",
    lieuDece: "",
    photo: null,
    nationalite: [],
    sexe: "",
  });

  const handleChange = (event) => {
    setArtistInfo({ ...artistInfo, [event.target.name]: event.target.value });
  };
  const formData = new FormData();

  const handleChangeImage = async (event) => {
    setArtistInfo({ ...artistInfo, photo: event.target.files[0] });
  };
  const handleSubmit = async () => {
    console.log(artistInfo);
    formData.append("nom", artistInfo.nom);
    formData.append("prenom", artistInfo.prenom);
    formData.append("biographie", artistInfo.biographie);
    formData.append("lieuNaissance", artistInfo.lieuNaissance);
    formData.append("dateNaissance", artistInfo.dateNaissance);
    formData.append("dateDece", artistInfo.dateDece);
    formData.append("lieuDece", artistInfo.lieuDece);
    formData.append("image", artistInfo.photo);
    artistInfo.nationalite.forEach((nat, index) => {
      formData.append(`nationalite[${index}][code]`, nat.code);
      formData.append(`nationalite[${index}][label]`, nat.label);
    });
    formData.append("sexe", artistInfo.sexe);

    try {
      const response = dispatch(addArtist(formData));
      console.log(response);
      if (succes) {
        setArtistInfo([]);
        const message = "Artiste ajouter avec succès";
        Toastfunction.TaostSuccess(message);
        dispatch(handleClose());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedOption, setSelectedOption] = useState([]);

  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setArtistInfo({ ...artistInfo, nationalite: options });
  };
  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Ajouter un nouveau artiste</DialogTitle>
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
                  value={artistInfo.nom}
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
                  value={artistInfo.prenom}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Biographie</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nom d'utilisateur"
                  name="biographie"
                  value={artistInfo.biographie}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>lieuNaissance</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="lieuNaissance"
                  name="lieuNaissance"
                  value={artistInfo.lieuNaissance}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>dateNaissance</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="entrer dat eNaissance"
                  name="dateNaissance"
                  value={artistInfo.dateNaissance}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>dateDece</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="entrer dat eNaissance"
                  name="dateDece"
                  value={artistInfo.dateDece}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>lieuDece</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="lieuNaissance"
                  name="lieuDece"
                  value={artistInfo.lieuDece}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>photo</Form.Label>
                <Form.Control type="file" onChange={handleChangeImage} />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Label>Genre </Form.Label>
              <Form.Select name="sexe" required onChange={handleChange}>
                <option value="Femme">Femme </option>
                <option value="Homme">Homme</option>
              </Form.Select>
            </Col>{" "}
            <Col md={6}>
              <Form.Label>Nationalité </Form.Label>

              <Autocomplete
                size="small"
                multiple
                options={countries}
                disableCloseOnSelect
                getOptionLabel={(option) => option.label}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label}
                    </Box>
                  </li>
                )}
                style={{ width: 250 }}
                onChange={handleOptionSelect}
                value={selectedOption}
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
