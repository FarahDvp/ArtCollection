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
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Document, Page, pdfjs } from "react-pdf";

import {
  getAllAcquisitionByOeuvre,
  deleteAcquisition,
} from "../../../Feature/acquisitionSlice";
import NewAcquisitionModal from "../../Modals/NewAcquisitionModal";
import { handleShowAcquisition } from "../../../Feature/modalSlice";
import formatImage from "../../../utils/formatImage";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Acquisition() {
  const dispatch = useDispatch();
  const { oeuvreId } = useParams();
  const { AcquisitionList } = useSelector((state) => state.acquisition);

  useEffect(() => {
    const response = dispatch(getAllAcquisitionByOeuvre(oeuvreId));
  }, [dispatch]);

  const handleDelete = (_id) => {
    try {
      dispatch(deleteAcquisition(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const [ShowImagee, setShowImagee] = useState(false);
  const [urlImage, setUrlImage] = useState("");
  const [ShowFile, setShowFile] = useState(false);
  const [urlFile, setUrlFile] = useState("");
  const handleOpenImage = (url) => {
    setShowImagee(true);
    setUrlImage(url);
  };
  const handleOpenFile = (url) => {
    setUrlFile(url);
    window.open(url, "_blank");
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function handleDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div>
      {console.log(AcquisitionList)}
      <Stack direction="row" alignItems="left" justifyContent="flex-end" mb={2}>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={() => dispatch(handleShowAcquisition())}
          >
            {" "}
            Ajouter
          </Button>
        </Box>
      </Stack>
      {AcquisitionList &&
        AcquisitionList.map((item, index) => (
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
                  <th scope="col">Propriétaire actuel</th>
                  <td>{item.proprietaireActuel}</td>
                </tr>
                <tr>
                  <th scope="col">Lieu d'acquisition</th>
                  <td>{item.lieuAcquisition}</td>
                </tr>
                <tr>
                  <th scope="col">Date d'acquisition</th>
                  <td>{item.dateAcquisition}</td>
                </tr>
                <tr>
                  <th scope="col">Prix d'acquisition</th>
                  <td>{item.prixAcquisition}</td>
                </tr>
                <tr>
                  <th scope="col">Moyen d'acquisition</th>
                  <td>{item.moyenAcquisition}</td>
                </tr>
                <tr>
                  <th scope="col">Preuve d'achat</th>
                  {item.preuveAchat &&
                  formatImage.isImageFile(item.preuveAchat) ? (
                    <td>
                      <IconButton
                        onClick={() => handleOpenImage(item.preuveAchat)}
                      >
                        {" "}
                        <ImageIcon />
                      </IconButton>{" "}
                    </td>
                  ) : (
                    <td>
                      {" "}
                      <IconButton>
                        {" "}
                        <PictureAsPdfIcon />
                      </IconButton>{" "}
                    </td>
                  )}
                </tr>
                <tr>
                  <th scope="col">Certificat</th>
                  {item.certificat &&
                  formatImage.isImageFile(item.certificat) ? (
                    <td>
                      <IconButton>
                        {" "}
                        <ImageIcon />
                      </IconButton>{" "}
                    </td>
                  ) : (
                    <td>
                      {" "}
                      <IconButton
                        onClick={() => handleOpenFile(item.certificat)}
                      >
                        {" "}
                        <PictureAsPdfIcon />
                      </IconButton>{" "}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </Grid>
        ))}
      <Dialog open={ShowImagee} onClose={() => setShowImagee(false)}>
        <DialogContent>
          <DialogContentText>
            <img src={urlImage && urlImage} alt="oeuvre" />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog open={ShowFile} onClose={() => setShowFile(false)}>
        <DialogContent>
          <Document file={urlFile}>
            <Page pageNumber={1} />
          </Document>{" "}
        </DialogContent>
      </Dialog>

      <NewAcquisitionModal />
    </div>
  );
}

export default Acquisition;
