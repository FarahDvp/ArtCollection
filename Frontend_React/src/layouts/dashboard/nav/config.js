import Person2Icon from "@mui/icons-material/Person2";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ExposureIcon from "@mui/icons-material/Exposure";
// component
import SvgColor from "../../../components/svg-color";
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Profile",
    path: "/FondationHasdrubal/profile",
    icon: <Person2Icon />,
  },

  {
    title: "Administrateur",
    path: "/FondationHasdrubal/user",
    icon: icon("ic_user"),
  },
  {
    title: "Oeuvre",
    path: "/FondationHasdrubal/oeuvre",
    icon: <QueryStatsIcon />,
  },

  {
    title: "artiste",
    path: "/FondationHasdrubal/artiste",
    icon: icon("ic_blog"),
  },
  {
    title: "exposition",
    path: "/FondationHasdrubal/exposition",
    icon: <ExposureIcon />,
  },
  {
    title: "historique",
    path: "/FondationHasdrubal/historique",
    icon: <ManageHistoryIcon />,
  },
];

export default navConfig;
