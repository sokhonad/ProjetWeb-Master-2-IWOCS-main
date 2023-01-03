import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="NavBar">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/prix-moyen">Prix moyen au m²</NavLink>
      <NavLink to="/nombre-de-ventes">Nombre de vente</NavLink>
      <NavLink to="/repartition-ventes-regions">
        Répartition des ventes par régions
      </NavLink>
    </div>
  );
};

export default NavBar;
