import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";

import {
  Stack,
  Container,
  Typography,
  Button,
  TableHead,
  MenuItem,
  Popover,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridToolbar,
  frFR,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

import NewArtistModal from "../components/Modals/NewArtistModal";
import Iconify from "../components/iconify";
import { handleShow, handleShowEdit } from "../Feature/modalSlice";
import { getAllArtiste, deleteArtiste } from "../Feature/artisteSlice";
import Notification from "../layouts/notification/Notification";
import Toast from "../layouts/Toast/ToastContainer";
import { fDate } from "../utils/formatTime";
import nationaliteAPI from "../services/nationaliteAPI";
import EditArtistt from "../components/Modals/EditArtist";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  frFR
);
export default function ArtistePage() {
  const dispatch = useDispatch();
  const { artisteList, succes, loading } = useSelector(
    (state) => state.artiste
  );

  useEffect(() => {
    dispatch(getAllArtiste());
    GetAllNationalite();
  }, [dispatch]);

  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection.selectionModel);
  };

  const handleDeleteSelected = () => {
    console.log(selectedIds);
    selectedIds.forEach((id) => {
      // Delete row using your delete function
    });
    setSelectedIds([]);
  };

  const columns = [
    {
      field: "photo",
      headerName: "Avatar",
      renderCell: (params) => (
        <Avatar
          src={params.row.photo}
          onClick={() => console.log(params.row._id)}
        />
      ),
      headerClassName: "super-app-theme--header",
      width: 70,
    },
    {
      field: "nom",
      headerName: "Nom",
      width: 80,
      editable: true,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "prenom",
      headerName: "Prénom",
      width: 80,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "biographie",
      headerName: "Biographie",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "sexe",
      headerName: "Genre",
      width: 70,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dateNaissance",
      headerName: "Date  De Naissance",
      type: "date",
      width: 130,
      headerClassName: "super-app-theme--header",
      valueGetter: (params) => fDate(params.row.dateNaissance),
    },
    {
      field: "lieuNaissance",
      headerName: "Lieu De Naissance",
      width: 130,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "dateDece",
      headerName: "Date De Décès",
      width: 130,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => fDate(params.row.dateDece),
    },
    {
      field: "lieuDece",
      headerName: "Lieu De Décès",
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => params.row.lieuDece,
    },
    {
      field: "nationalite",
      headerName: "Nationalité",
      width: 100,

      renderCell: (params) => {
        const nationalites = params.row.nationalite || [];
        return nationalites.map((nat) => {
          return (
            <Tooltip title={nat.label} key={nat._id}>
              <img
                className="m-1"
                key={nat.code}
                src={`https://flagcdn.com/w20/${nat.code.toLowerCase()}.png`}
                alt={nat.nom}
              />
            </Tooltip>
          );
        });
      },
      headerClassName: "super-app-theme--header",
    },
    {
      headerName: "Actions",

      field: "actions",
      type: "actions",
      width: 70,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => dispatch(handleShow(params.row))}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => dispatch(deleteArtiste(params.row._id))}
        />,
      ],
    },
  ];

  const [Nationnalite, setNationnalite] = useState([]);

  const GetAllNationalite = async () => {
    try {
      const response = await nationaliteAPI.getAll();
      console.log(response);
      setNationnalite(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Helmet>
        <title>Artiste </title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Artiste
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => dispatch(handleShow())}
          >
            Nouveau Artiste
          </Button>
        </Stack>
        <Box
          sx={{
            height: 500,
            width: "100%",
            "& .super-app-theme--header": {
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <DataGrid
              components={{
                Toolbar: () => (
                  <div style={{ display: "flex" }}>
                    <GridToolbar style={{ marginRight: "auto" }} />
                    <IconButton onClick={handleDeleteSelected}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                ),
              }}
              slots={{
                loadingOverlay: loading && LinearProgress,
              }}
              loading={loading}
              rows={artisteList}
              columns={columns}
              pageSize={6}
              rowsPerPageOptions={[6]}
              checkboxSelection
              getRowId={(row) => row._id}
              // experimentalFeatures={{ newEditingApi: true }}
              style={{ padding: 15 }}
              selectionModel={selectedIds}
              onSelectionModelChange={handleSelectionChange}
            />
          </ThemeProvider>
        </Box>
      </Container>
      <Toast />
      <NewArtistModal />
      <EditArtistt />
    </>
  );
}
