import Home from "./pages/Home";
import Profil from "./pages/user/Profil";
import Login from "./pages/user/Login";
import Daftar from "./pages/user/Daftar";
import Keranjang from "./pages/Keranjang";

export const routes = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
  },
  {
    path: "/keranjang",
    name: "Keranjang",
    element: <Keranjang />,
  },
  {
    path: "/daftar",
    name: "Daftar",
    element: <Daftar />,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/profil",
    name: "Profil",
    element: <Profil />,
  },
];
