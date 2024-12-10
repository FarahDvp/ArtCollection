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
import {
  getAllBibliographieByOeuvre,
  deleteBibliographie,
} from "../../../Feature/bibliographieSlice";
import NewBibliographieModal from "../../Modals/NewBibliographieModal";
import { handleShowBibliographie } from "../../../Feature/modalSlice";
import NewImageModal from "../../Modals/NewImageModal";

function Bibliographie() {
  const dispatch = useDispatch();
  const [Show, setShow] = useState(false);
  const { oeuvreId } = useParams();
  const { BibliographieList } = useSelector((state) => state.bibliographie);

  useEffect(() => {
    const response = dispatch(getAllBibliographieByOeuvre(oeuvreId));
    console.log(response.data);
  }, [dispatch]);

  const handleDelete = (_id) => {
    try {
      dispatch(deleteBibliographie(_id));
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
            onClick={() => dispatch(handleShowBibliographie())}
          >
            {" "}
            Ajouter
          </Button>
        </Box>
      </Stack>
      {BibliographieList &&
        BibliographieList.map((item, index) => (
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
                    Bibliography Item N° {index + 1}
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
                  <th scope="col">Titre</th>
                  <td>{item.titre}</td>
                </tr>
                <tr>
                  <th scope="col">Nom de l'auteur</th>
                  <td>{item.nomAuteur}</td>
                </tr>{" "}
                <tr>
                  <th scope="col">Page</th>
                  <td>{item.page}</td>
                </tr>
                <tr>
                  <th scope="col">Date de publication</th>
                  <td>{item.datePublication}</td>
                </tr>{" "}
                <tr>
                  <th scope="col">Éditeur</th>
                  <td>{item.editeur}</td>
                </tr>
                <tr>
                  <th scope="col">Publication</th>
                  <td>{item.publication}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        ))}

      <NewBibliographieModal />
    </div>
  );
}

export default Bibliographie;
