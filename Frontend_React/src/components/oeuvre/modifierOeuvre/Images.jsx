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
  getAllImagesByOeuvre,
  deleteImages,
} from "../../../Feature/imagesSlice";
import NewRestaurationModal from "../../Modals/NewRestaurationModal";
import { handleShowImage } from "../../../Feature/modalSlice";
import NewImageModal from "../../Modals/NewImageModal";

function Images() {
  const dispatch = useDispatch();
  const [Show, setShow] = useState(false);
  const { oeuvreId } = useParams();
  const { ImagesList } = useSelector((state) => state.image);

  useEffect(() => {
    const response = dispatch(getAllImagesByOeuvre(oeuvreId));
    console.log(response.data);
  }, [dispatch]);

  const handleDelete = (_id) => {
    try {
      dispatch(deleteImages(_id));
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
            onClick={() => dispatch(handleShowImage())}
          >
            {" "}
            Ajouter{" "}
          </Button>
        </Box>
      </Stack>
      {ImagesList &&
        ImagesList.map((item, index) => (
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
                    Image N° {index + 1}
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
            <Grid item xs={12} md={2} lg={2}>
              <img
                className="shadow-lg rounded border "
                src={item.url}
                alt="imdage"
                style={{
                  height: 150,
                }}
              />
            </Grid>
            <Grid item xs={12} md={10} lg={10}>
              <table className="table table-hover ">
                <tbody style={{ fontSize: 13 }}>
                  <tr>
                    <th scope="col">Copyright</th>

                    <td>{item.copyright}</td>
                  </tr>
                  <tr>
                    <th scope="col">Droit</th>

                    <td>{item.droit}</td>
                  </tr>{" "}
                  <tr>
                    <th scope="col">Date De Sortie </th>

                    <td>{item.dateSortie}</td>
                  </tr>
                  <tr>
                    <th scope="col">Autre Informations</th>
                    <td>{item.autreInformation}</td>
                  </tr>{" "}
                </tbody>
              </table>
            </Grid>
          </Grid>
        ))}

      <NewImageModal />
    </div>
  );
}

export default Images;
