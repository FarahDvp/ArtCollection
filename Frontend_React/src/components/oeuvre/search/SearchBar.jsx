import React from "react";
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
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

function SearchBar() {
  return (
    <>
      <Grid
        container
        alignItems="center"
        direction="row"
        sx={{ height: 150 }}
        spacing={3}
      >
        <Grid item xs={12} sm={6} md={6} textAlign="left">
          <TextField
            placeholder="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "100%",
              fontWeight: "bold",
            }}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={6} textAlign="right">
          <Button variant="text" endIcon={<FilterListIcon />} size="large">
            Filtre
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default SearchBar;
