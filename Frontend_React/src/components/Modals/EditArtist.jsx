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
import {
  addArtist,
  editArtist,
  getOneArtiste,
} from "../../Feature/artisteSlice";
import "./modalStyle.css";
import Toastfunction from "../../utils/ToastFunction";
import { countries } from "../../utils/countries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function EditArtistt() {
  const dispatch = useDispatch();
  const { showEdit, artist } = useSelector((state) => state.modal);
  const { succes } = useSelector((state) => state.artiste);

  const [artistInfo, setArtistInfo] = useState({
    nom: "",
    prenom: "",
    biographie: "",
    lieuNaissance: "",
    dateNaissance: "",
    dateDece: "",
    lieuDece: "",
    photo: "",
    sexe: "",
    nationalite: [],
  });
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    setArtistInfo({
      nom: artist.nom,
      prenom: artist.prenom,
      biographie: artist.biographie,
      lieuNaissance: artist.lieuNaissance,
      dateNaissance: artist.dateNaissance
        ? new Date(artist.dateNaissance).toISOString().substr(0, 10)
        : "",
      dateDece: artist.dateDece
        ? new Date(artist.dateDece).toISOString().substr(0, 10)
        : "",
      lieuDece: artist.lieuDece,
      photo: artist.photo,
      sexe: artist.sexe,
      nationalite: artist.nationalite,
    });
    setSelectedOption(artist.nationalite);
  }, [artist]);

  const handleClosee = () => {
    dispatch(handleClose());
    setArtistInfo({
      nom: artist.nom,
      prenom: artist.prenom,
      biographie: artist.biographie,
      lieuNaissance: artist.lieuNaissance,
      dateNaissance: artist.dateNaissance,

      dateDece: artist.dateDece,

      lieuDece: artist.lieuDece,
      photo: artist.photo,
      nationalite: artist.nationalite,
      sexe: artist.sexe,
    });
    setSelectedOption(artist.nationalite);
  };
  const handleChange = (event) => {
    setArtistInfo({ ...artistInfo, [event.target.name]: event.target.value });
  };
  const formData = new FormData();

  const handleChangeImage = async (event) => {
    setArtistInfo({ ...artistInfo, photo: event.target.files[0] });
  };
  const handleOptionSelect = (event, options) => {
    setSelectedOption(options);
    setArtistInfo({ ...artistInfo, nationalite: options });

    console.log(artistInfo);
  };
  const handleSubmit = async () => {
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
      const id = artist._id;
      console.log(artistInfo);
      const response = dispatch(
        editArtist({ id, info: formData, artistIn: artistInfo })
      );
      console.log(response);
      if (succes) {
        dispatch(handleClose());
        const message = "Artiste modifier avec succès";
        Toastfunction.TaostSuccess(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      {console.log(artist)}
      <Dialog open={showEdit} onClose={handleClose}>
        <DialogTitle>Modifier l'artiste</DialogTitle>
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
                  defaultValue={artist.nom}
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
                  defaultValue={artist.prenom}
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
                  defaultValue={artist.biographie}
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
                  defaultValue={artist.lieuNaissance}
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
                  defaultValue={
                    artist.dateDece
                      ? new Date(artist.dateDece).toISOString().substr(0, 10)
                      : ""
                  }
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
                  name="dateDece"
                  defaultValue={
                    artist.dateDece
                      ? new Date(artist.dateDece).toISOString().substr(0, 10)
                      : ""
                  }
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
                  defaultValue={artist.lieuDece}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6}>
              {" "}
              <Form.Label>Genre </Form.Label>
              <Form.Select name="sexe" onChange={handleChange}>
                <option value="Femme">Femme </option>
                <option value="Homme">Homme</option>
              </Form.Select>
            </Col>{" "}
            <Col md={6}>
              <Form.Label>Nationalité </Form.Label>

              <Autocomplete
                value={selectedOption || artist.nationalite}
                size="small"
                multiple
                options={countries}
                disableCloseOnSelect
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label && option.code === value.code
                }
                renderOption={(props, option, { selected }) => {
                  const isDefaultSelected = artistInfo.nationalite;
                  return (
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
                          checked={selected} // update checked property
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
