import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Notification({ open, handleClose, message }) {
  const action = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <div>
      {console.log(open)}
      <Snackbar
        open={open}
        autoHideDuration={10}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
}

export default Notification;
