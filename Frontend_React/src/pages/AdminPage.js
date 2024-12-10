import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  Stack,
  Container,
  Typography,
  Button,
  TableHead,
  MenuItem,
  Popover,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import NewAdminModal from "../components/Modals/NewAdminModal";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import { handleClose, handleShow } from "../Feature/modalSlice";
import { getAllAdmin, deleteAdmin } from "../Feature/userSlice";
import Notification from "../layouts/notification/Notification";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { adminList, succes } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllAdmin());
  }, [dispatch]);

  const handleDelete = (itemId) => {
    dispatch(deleteAdmin(itemId));
    dispatch(getAllAdmin());
    handleOpenNotif();
  };

  const [Open, setOpen] = useState(false);

  const handleOpenNotif = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      style={{ padding: 20, margin: 20, borderRadius: 10 }}
      bgcolor="#beceff4d"
    >
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Administrateur
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => dispatch(handleShow())}
          >
            Nouveau administrateur
          </Button>
        </Stack>
        <Scrollbar>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b> #</b>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <b>Nom </b>{" "}
                  </TableCell>

                  <TableCell>
                    {" "}
                    <b> Prénom</b>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <b>Email </b>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <b> N° Téléphone</b>{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <b> Other </b>{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminList.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Avatar alt="Remy Sharp" src={item.profileImage} />
                    </TableCell>
                    <TableCell>{item.nom}</TableCell>
                    <TableCell>{item.prenom}</TableCell>
                    <TableCell>
                      {item.email ? item.email : "néant"}
                    </TableCell>{" "}
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(item._id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>{" "}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Container>

      <Notification
        open={Open}
        handleOpen={handleOpenNotif}
        message="Admin Deleted Succesfully"
        handleClose={handleClose}
      />
      <NewAdminModal />
    </Box>
  );
}
