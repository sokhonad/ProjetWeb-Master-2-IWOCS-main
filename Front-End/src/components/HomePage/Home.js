import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="HomePage">
      <h1 className="hero-title">FullStack Lab</h1>
      <h3 className="hero-subtitle">
        Visualisation des informations de valeurs foncières
      </h3>

      <section className="hero-presentation">
        <Link to="/prix-moyen">
          <h2>Prix moyen au m²</h2>
          <p>
            Visualisation du prix moyen au m² sur <span>5 ans</span> pour{" "}
            <span>appartement</span> ou <span>maison</span>
          </p>
          <img src="svg/s-temp.svg"></img>
        </Link>
        <Link to="/nombre-de-ventes">
          <h2>Nombre de vente</h2>
          <p>
            Visualisation du nombre de vente sur une{" "}
            <span>période choisie</span>. Possibilité de visualisé les ventes
            par <span>jours</span>, <span>mois</span>, <span>années</span>
          </p>
          <img src="svg/d-a-b.svg"></img>
        </Link>
        <Link to="/repartition-ventes-regions">
          <h2>Répartition des ventes par régions</h2>
          <p>
            Visualisation de la répartition des ventes par régions pour une{" "}
            <span>année choisie</span>
          </p>
          <img src="svg/d-camember.svg"></img>
        </Link>
      </section>
    </div>
  );
};

export default Home;
