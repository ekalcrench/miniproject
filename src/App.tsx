import { Route, Routes, Navigate } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  return (
    <Routes>
      {/* Mapping routes */}
      {routes.map((prop, key) => {
        return <Route path={prop.path} element={prop.element} key={key} />;
      })}
      {/* Redirect wrong path to home */}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
