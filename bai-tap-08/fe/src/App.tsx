import { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "./routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
