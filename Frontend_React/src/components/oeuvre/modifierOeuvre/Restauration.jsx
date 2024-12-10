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
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestaurationByOeuvre,
  deleteRestauration,
} from "../../../Feature/restaurationSlice";
import NewRestaurationModal from "../../Modals/NewRestaurationModal";
import { handleShow } from "../../../Feature/modalSlice";

function Restauration() {
  const dispatch = useDispatch();
  const [Show, setShow] = useState(false);
  const { oeuvreId } = useParams();
  const { RestaurationList } = useSelector((state) => state.restauration);

  useEffect(() => {
    const response = dispatch(getAllRestaurationByOeuvre(oeuvreId));
    console.log(response.data);
  }, [dispatch]);

  const handleDelete = (_id) => {
    try {
      dispatch(deleteRestauration(_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Stack direction="row" alignItems="left" justifyContent="flex-end" mb={2}>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={() => dispatch(handleShow())}
          >
            {" "}
            Ajouter{" "}
          </Button>
        </Box>
      </Stack>
      {RestaurationList &&
        RestaurationList.map((item, index) => (
          <Accordion className="shadow border  rounded ">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box sx={{ width: "90%", flexShrink: 0 }}>
                <Typography color="#3f51b5">
                  Restauration numéro {index + 1}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "left" }}>
                <Tooltip title="Modifier">
                  <IconButton aria-label="Ajouter" className="m-1" size="small">
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
            </AccordionSummary>
            <AccordionDetails>
              <table className="table table-hover ">
                <tbody style={{ fontSize: 13 }}>
                  <tr>
                    <th scope="col">Constat</th>

                    <td>{item.constat}</td>
                  </tr>
                  <tr>
                    <th scope="col">Causes</th>

                    <td>{item.causes}</td>
                  </tr>{" "}
                  <tr>
                    <th scope="col">Date</th>

                    <td>{item.date}</td>
                  </tr>
                  <tr>
                    <th scope="col">Lieu</th>
                    <td>{item.lieu}</td>
                  </tr>{" "}
                  <tr>
                    <th scope="col">Nom du restaurateur</th>
                    <td>{item.nomRestaurateur}</td>
                  </tr>{" "}
                  <tr>
                    <th scope="col">type d'Intervention</th>
                    <td>{item.typeIntervention}</td>
                  </tr>
                  <tr>
                    <th scope="col">materiel</th>
                    <td>
                      {" "}
                      {item.materiel &&
                        item.materiel.map((a) => <span> {a.nom},</span>)}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">techniqueUtilise</th>
                    <td>{item.techniqueUtilise}</td>
                  </tr>
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        ))}

      {/* RestaurationList &&
        RestaurationList.map((item, index) => (
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
                    Restauration numéro {index + 1}
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
                  <th scope="col">Constat</th>

                  <td>{item.constat}</td>
                </tr>
                <tr>
                  <th scope="col">Causes</th>

                  <td>{item.causes}</td>
                </tr>{" "}
                <tr>
                  <th scope="col">Date</th>

                  <td>{item.date}</td>
                </tr>
                <tr>
                  <th scope="col">Lieu</th>
                  <td>{item.lieu}</td>
                </tr>{" "}
                <tr>
                  <th scope="col">Nom du restaurateur</th>
                  <td>{item.nomRestaurateur}</td>
                </tr>{" "}
                <tr>
                  <th scope="col">type d'Intervention</th>
                  <td>{item.typeIntervention}</td>
                </tr>
                <tr>
                  <th scope="col">materiel</th>
                  <td>
                    {" "}
                    {item.materiel.map((a) => (
                      <span> {a.nom},</span>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th scope="col">techniqueUtilise</th>
                  <td>{item.techniqueUtilise}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
                    )) */}
      <NewRestaurationModal />
    </>
  );
}

export default Restauration;
