import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/HomePage/Home";
import NombreDeVentes from "./components/NombreDeVentes/NombreDeVentes";
import NotFound from "./components/NotFound";
import PrixMoyen from "./components/PrixMoyen/PrixMoyen";
import RepartitionVentesRegions from "./components/RepartitionVentesRegions/RepartitionVentesRegions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/prix-moyen" exact element={<PrixMoyen />} />
        <Route path="/nombre-de-ventes" exact element={<NombreDeVentes />} />
        <Route path="/repartition-ventes-regions" exact element={<RepartitionVentesRegions />}/>
        <Route path="/" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
