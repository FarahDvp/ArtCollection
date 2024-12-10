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

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReserveByOeuvre,
  deleteReserve,
} from "../../../Feature/reserveSlice";
import NewReserveModal from "../../Modals/NewReserveModal";
import { handleShowReserve } from "../../../Feature/modalSlice";

function Reserve() {
  const dispatch = useDispatch();
  const { oeuvreId } = useParams();
  const { ReserveList } = useSelector((state) => state.reserve);

  useEffect(() => {
    const response = dispatch(getAllReserveByOeuvre(oeuvreId));
    console.log(response.data);
  }, [dispatch]);

  const handleDelete = (_id) => {
    try {
      dispatch(deleteReserve(_id));
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
            onClick={() => dispatch(handleShowReserve())}
          >
            {" "}
            Ajouter
          </Button>
        </Box>
      </Stack>
      {ReserveList &&
        ReserveList.map((item, index) => (
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
                  <th scope="col">Lieu</th>
                  <td>{item.lieu}</td>
                </tr>
                <tr>
                  <th scope="col">Place dans le dépôt</th>
                  <td>{item.placeDansLeDepot}</td>
                </tr>
                <tr>
                  <th scope="col">Mode de stockage</th>
                  <td>{item.modeDeStockage}</td>
                </tr>
                <tr>
                  <th scope="col">Emballée</th>
                  <td>{item.emballee}</td>
                </tr>
              </tbody>
            </table>
          </Grid>
        ))}

      <NewReserveModal />
    </div>
  );
}

export default Reserve;
