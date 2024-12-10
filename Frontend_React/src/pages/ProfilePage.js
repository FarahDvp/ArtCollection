import { Helmet } from "react-helmet-async";
import { useState } from "react";
// @mui
import {
  Typography,
  Container,
  Stack,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
} from "../sections/@dashboard/products";
// mock

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  border: "1px solid rgba(75, 75, 75, 0.267)",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
}));
export default function ProfilePage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container>
      <Helmet>
        <title> Profile </title>
      </Helmet>

      <>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Profile
        </Typography>
      </>
    </Container>
  );
}
