import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "../hooks/useResponsive";
import Logo from "../components/logo";
import Iconify from "../components/iconify";
import { userLogin } from "../Feature/authSlice";

export default function LoginPage() {
  const mdUp = useResponsive("up", "md");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, errorUserName, errorPassword } = useSelector(
    (state) => state.auth
  );

  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const onLogin = () => {
    dispatch(userLogin(userInfo))
      .unwrap() // unwrap property which can be called to extract the payload of a fulfilled action or to throw either the error o
      .then(() => navigate("/FondationHasdrubal/user", { replace: true }))
      .catch((error) => "handle error");
  };
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, sm: 24, md: 40 },
          left: { xs: 16, sm: 24, md: 40 },
        }}
      />

      <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
        Bienvenu
      </Typography>

      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Connexion
        </Typography>
        <Stack spacing={3}>
          <TextField
            name="userName"
            value={userInfo.userName}
            label="Nom d'utilisateur"
            onChange={handleChange}
          />

          <TextField
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Link variant="subtitle2" underline="hover">
            Vous avez oubliez votre mot de passe ?
          </Link>
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={onLogin}
        >
          Connexion
        </LoadingButton>{" "}
      </Container>
    </>
  );
}
