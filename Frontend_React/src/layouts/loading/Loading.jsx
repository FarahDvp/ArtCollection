import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function Loading() {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: 500 }}
    >
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </Grid>
  );
}
