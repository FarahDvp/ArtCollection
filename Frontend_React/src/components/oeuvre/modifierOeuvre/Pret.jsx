import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Stack,
  Box,
  Tooltip,
  Paper,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import { getAllPretByOeuvre, deletePret } from "../../../Feature/pretSlice";
import NewPretModal from "../../Modals/NewPretModal";
import { handleShowPret } from "../../../Feature/modalSlice";
import NewImageModal from "../../Modals/NewImageModal";

function Pret() {
  const dispatch = useDispatch();
  const { oeuvreId } = useParams();
  const { PretList } = useSelector((state) => state.pret);

  useEffect(() => {
    const response = dispatch(getAllPretByOeuvre(oeuvreId));
    console.log(response.data);
  }, [dispatch]);

  const handleDelete = (_id) => {
    try {
      dispatch(deletePret(_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Stack direction="row" alignItems="left" justifyContent="flex-end" mb={2}>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={() => dispatch(handleShowPret())}
          >
            {" "}
            Ajouter
          </Button>
        </Box>
      </Stack>
      {PretList &&
        PretList.map((item, index) => (
          <Grid
            className="shadow border  rounded  mb-4 p-3"
            container
            key={item._id}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h6" color="#3f51b5">
                    Item N° {index + 1}
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="Modifier">
                    <IconButton
                      aria-label="Ajouter"
                      className="m-1"
                      size="small"
                    >
                      <ModeEditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Supprimer">
                    <IconButton
                      aria-label="Ajouter"
                      className="m-1"
                      size="small"
                      onClick={() => handleDelete(item._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
            </Grid>

            <table className="table table-hover ">
              <tbody style={{ fontSize: 13 }}>
                <tr>
                  <th scope="col">Institution</th>
                  <td>{item.institution}</td>
                </tr>
                <tr>
                  <th scope="col">Objet</th>
                  <td>{item.Objet}</td>
                </tr>
                <tr>
                  <th scope="col">Frais</th>
                  <td>{item.frais}</td>
                </tr>
                <tr>
                  <th scope="col">Titre</th>
                  <td>{item.titre}</td>
                </tr>
                <tr>
                  <th scope="col">Date de début</th>
                  <td>{item.dateDebut}</td>
                </tr>
                <tr>
                  <th scope="col">Date de fin</th>
                  <td>{item.dateFin}</td>
                </tr>
                <tr>
                  <th scope="col">Type</th>
                  <td>{item.assurance.type}</td>
                </tr>{" "}
                <tr>
                  <th scope="col">Coût</th>
                  <td>{item.assurance.cout}</td>
                </tr>
                <tr>
                  <th scope="col">Contrat</th>
                  <td>{item.assurance.contrat}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        ))}

      <NewPretModal />
    </div>
  );
}

export default Pret;
