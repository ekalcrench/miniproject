import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { routes } from "./routes";

export default function App() {
  const userIsLoggedIn = useAppSelector((state: any) => state.user.isLoggedIn);
  if (userIsLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Navigate replace to="/" />} />
        {/* Mapping routes */}
        {routes.map((prop, key) => {
          return <Route path={prop.path} element={prop.element} key={key} />;
        })}
        {/* Redirect wrong path to home */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }else{
    return (
      <Routes>
        <Route path="/profil" element={<Navigate replace to="/login" />} />
        <Route path="/transaksi" element={<Navigate replace to="/login" />} />
        {/* Mapping routes */}
        {routes.map((prop, key) => {
          return <Route path={prop.path} element={prop.element} key={key} />;
        })}
        {/* Redirect wrong path to home */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }
}
