import Home from "./pages/Home";
import Profil from "./pages/user/Profil";
import Login from "./pages/user/Login";
import Keranjang from "./pages/Keranjang";
import SyaratdanKetentuan from "./pages/prasyarat/SyaratdanKetentuan";
import KebijakanPrivasi from "./pages/prasyarat/KebijakanPrivasi";

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
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/profil",
    name: "Profil",
    element: <Profil />,
  },
  {
    path: "/syaratdanketentuan",
    name: "Syarat dan Ketentuan",
    element: <SyaratdanKetentuan />,
  },
  {
    path: "/kebijakanprivasi",
    name: "Kebijakan Privasi",
    element: <KebijakanPrivasi />,
  },
];
