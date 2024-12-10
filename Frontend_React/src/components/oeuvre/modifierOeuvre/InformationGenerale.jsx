import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Tooltip from "@mui/material/Tooltip";

import {
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getOneOeuvre } from "../../../Feature/oeuvreSlice";
import { handleShowInfoGeneral } from "../../../Feature/modalSlice";
import EditInformationGenerale from "../../Modals/EditInformationGenerale";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  border: "1px solid rgba(75, 75, 75, 0.267)",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
}));

function InformationGenerale() {
  const { oeuvreId } = useParams();
  const { oeuvreInfo } = useSelector((state) => state.oeuvre);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneOeuvre(oeuvreId));
  }, [dispatch]);

  return (
    <Item
      sx={{
        height: "450px",
      }}
    >
      {oeuvreInfo ? (
        <>
          <Tooltip title="Modifier">
            <IconButton
              aria-label="Ajouter"
              className="m-1"
              size="small"
              onClick={() => dispatch(handleShowInfoGeneral())}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <div key={oeuvreInfo._id}>
            <Typography variant="h6"> {oeuvreInfo.titre}</Typography>
            <Typography variant="body2" color="blueGrey" className="p-2">
              {oeuvreInfo.description}
            </Typography>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                Categorie
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.categorie ? oeuvreInfo.categorie.nom : " "}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                Date de Creation
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.dateDeCreation}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                Poid
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.poid}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                Dimension:
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                hauteur: &nbsp;{" "}
                {oeuvreInfo.dimension && oeuvreInfo.dimension.hauteur}
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                largeur &nbsp;{" "}
                {oeuvreInfo.dimension && oeuvreInfo.dimension.largeur}
              </Typography>
              {oeuvreInfo.dimension && oeuvreInfo.dimension.profondeur ? (
                <Typography variant="caption" color="blueGrey" className="p-2">
                  profondeur &nbsp;{" "}
                  {oeuvreInfo.dimension && oeuvreInfo.dimension.profondeur}
                </Typography>
              ) : (
                " "
              )}
            </Box>{" "}
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                Nombre d'élément
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.nbElement}
              </Typography>
            </Box>{" "}
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                Type tirage
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.typeTirage}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                N° tirage
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.numeroTirage}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                support
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.support}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                materiaux
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.materiel &&
                  oeuvreInfo.materiel.map((i) => (
                    <span key={i._id}> {i.nom} , </span>
                  ))}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                Localisation
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.localisationSurOeuvre}
              </Typography>
            </Box>
            <Box>
              <Typography variant="overline" color="blueGrey" className="p-2">
                description du signature
              </Typography>
              <Typography variant="caption" color="blueGrey" className="p-2">
                {oeuvreInfo.descriptionSignature}
              </Typography>
            </Box>
          </div>
        </>
      ) : (
        ""
      )}
      <EditInformationGenerale oeuvre={oeuvreInfo} />
    </Item>
  );
}

export default InformationGenerale;
