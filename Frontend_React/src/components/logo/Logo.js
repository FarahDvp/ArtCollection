// @mui
import { Box, Link } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" sx={{ display: "contents" }}>
      <img src="logo.png" alt="Logo" height={20} />
    </Link>
  );
}

export default Logo;
