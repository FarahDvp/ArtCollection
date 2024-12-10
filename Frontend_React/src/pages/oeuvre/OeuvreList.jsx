import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Stack,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import SearchBar from "../../components/oeuvre/search/SearchBar";
import { getAllOeuvre } from "../../Feature/oeuvreSlice";
import Loading from "../../layouts/loading/Loading";

const StyledCard = styled(Card)({
  height: "100%",
  boxShadow: "0px 4px 20px gray",
  transition: "transform 0.2s ease-out",
  cursor: "pointer",

  "&:hover": {
    transform: "scale(1.02)",
    filter: " brightness(85%)",
  },
});
function OeuvreList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { oeuvreList, succes, loading } = useSelector((state) => state.oeuvre);

  const handleNavigate = () => {
    navigate("/FondationHasdrubal/oeuvre/nouveau");
  };
  const handleNavigateOeuvre = (id) => {
    navigate(`/FondationHasdrubal/oeuvre/${id}`);
  };
  useEffect(() => {
    dispatch(getAllOeuvre());
  }, [dispatch]);

  return (
    <div>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Breadcrumbs separator="›" aria-label="breadcrumb" mb={2}>
            <Typography key="3" color="text.primary">
              Oeuvres
            </Typography>
          </Breadcrumbs>{" "}
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleNavigate}
          >
            Nouvelle Oeuvre
          </Button>
        </Stack>
        <SearchBar />
        <>
          <Grid container spacing={10}>
            {loading ? <Loading /> : ""}

            {oeuvreList.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item._id}
                onClick={() => handleNavigateOeuvre(item._id)}
              >
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="230"
                    image={item.image && item.image[0].url}
                    alt={item.titre}
                  />
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {item.titre}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {item.artiste.nom}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      color="text.secondary"
                    >
                      {item.dimension.hauteur} X {item.dimension.largeur}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {item.description}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </>
      </Container>
    </div>
  );
}

export default OeuvreList;
