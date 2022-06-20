import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { routes } from "./routes";

export default function App() {
  const userIsLoggedIn = useAppSelector((state: any) => state.user.isLoggedIn);
  return (
    <Routes>
      {/* If authenticated redirect to home, else redirect to login*/}
      {userIsLoggedIn ? (
        <Route path="/login" element={<Navigate replace to="/" />} />
      ) : (
        <Route path="/dashboard" element={<Navigate replace to="/login" />} />
      )}
      {/* Mapping routes */}
      {routes.map((prop, key) => {
        return <Route path={prop.path} element={prop.element} key={key} />;
      })}
      {/* Redirect wrong path to home */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
