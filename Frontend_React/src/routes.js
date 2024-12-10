import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import BlogPage from "./pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/ProductsPage";
import DashboardAppPage from "./pages/DashboardAppPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import OeuvreMain from "./pages/oeuvre/OeuvreMain";
import Oeuvre from "./pages/oeuvre/Oeuvre";
import OeuvreList from "./pages/oeuvre/OeuvreList";
import ArtistePage from "./pages/ArtistePage";
import NouveauOeuvre from "./pages/oeuvre/NouveauOeuvre";
import ModifierOeuvre from "./pages/oeuvre/ModifierOeuvre";
import ExpositionPage from "./pages/ExpositionPage";
import HistoriquePage from "./pages/HistoriquePage";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    { element: <Navigate to="/login" />, index: true },

    {
      path: "/FondationHasdrubal",
      element: <DashboardLayout />,
      children: [
        {
          /* path: "app", element: <DashboardAppPage /> */
        },
        { path: "user", element: <AdminPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "oeuvre", element: <OeuvreList /> },
        { path: "oeuvre/", element: <OeuvreList /> },
        { path: "oeuvre/:oeuvreId", element: <Oeuvre /> },
        { path: "oeuvre/:oeuvreId/modifier", element: <ModifierOeuvre /> },
        { path: "oeuvre/nouveau", element: <NouveauOeuvre /> },
        { path: "artiste", element: <ArtistePage /> },
        { path: "exposition", element: <ExpositionPage /> },
        { path: "historique", element: <HistoriquePage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
