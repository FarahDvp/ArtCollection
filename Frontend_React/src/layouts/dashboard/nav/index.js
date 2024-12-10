import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import Divider from "@mui/material/Divider";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";

import { useSelector, useDispatch } from "react-redux";
import account from "../../../_mock/account";
import useResponsive from "../../../hooks/useResponsive";
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
import NavSection2 from "../../../components/nav-section/NavSection2";
import L from "./logo.png";

import navConfig from "./config";

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");
  const [NavWidth, setNavWidth] = useState(NAV_WIDTH);
  const [Close, setClose] = useState(false);
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const handleClose = () => {
    setClose(true);
    setNavWidth(80);
  };
  const handleOpen = () => {
    setClose(false);
    setNavWidth(270);
  };

  const user = useSelector((state) => state.auth.user);

  const renderContent2 = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {Close ? (
        <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
          <IconButton onClick={handleOpen}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      ) : (
        <Button> close</Button>
      )}
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <img src={L} alt="Logo" height={40} />
      </Box>
      <Link underline="none">
        <StyledAccount>
          <Avatar src={user && user.profilImage} alt="photoURL" />
        </StyledAccount>
      </Link>
      <NavSection2 data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />
        </Stack>
      </Box>
      */}
    </Scrollbar>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "flex",
          position: "absolute",
          right: 0,
        }}
      >
        <IconButton onClick={handleClose}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box
        sx={{
          px: 2.5,
          py: 3,
        }}
      >
        <Link sx={{ display: "contents" }}>
          <img src={L} alt="Logo" height={50} />
        </Link>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={user && user.profilImage} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user && user.userName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user && user.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />
        </Stack>
      </Box>
      */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NavWidth },
      }}
    >
      {isDesktop && Close ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NavWidth,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent2}
        </Drawer>
      ) : isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NavWidth,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
