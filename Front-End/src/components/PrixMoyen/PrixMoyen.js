import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { capitalize } from "../../helpers/string";
import LineChart from "../LineChart";
import NavBar from "../NavBar/NavBar";

const PrixMoyen = () => {
  const [lineChartData, setLineChartData] = useState([]);
  const [type, setType] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const url = new URL("http://127.0.0.1:8000/api/land/linechart");

    if (type) {
      url.search = new URLSearchParams({ type }).toString();
    }

    setLoading(true);
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const months = [];
        data.forEach((d) => {
          const currentDate = DateTime.fromJSDate(new Date(d.date));

          const exist = months.find((m) => {
            const date = DateTime.fromJSDate(new Date(m.date));

            return (
              date.year === currentDate.year && date.month === currentDate.month
            );
          });

          if (!exist && currentDate.year !== 1970) {
            months.push(d);
          }
        });

        const lineChartDataTemp = months.map((d, i) => {
          const date = new Date(d.date);
          const dt = DateTime.fromJSDate(date);
          const formatedDate = capitalize(
            dt.toLocaleString({
              month: "long",
              year: "numeric",
            })
          );

          return {
            value: parseInt(d.price, 10) / 1000,
            label: formatedDate,
            index: i,
            tooltipContent: `${formatedDate}<br><b>Prix moyen du m²: </b>${parseInt(d.price, 10)} €`,
          };
        });

        setLineChartData(lineChartDataTemp);
        setLoading(false);
      });
  }, [type]);

  const typeChanged = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="chart-page">
      <NavBar />
      <section className="container">
        <div className="titles">
          <h1>Prix moyen du m²</h1>
          <h2 className="sub-title">Pour <select disabled={loading} onChange={typeChanged} style={{ marginBottom: "1rem" }} className="title-select">
              <option value="">n'importe quel type de bien</option>
              <option value="appartement">un Appartement</option>
              <option value="maison">une Maison</option>
              <option value="dependance">une Dépendance</option>
              <option value="local">un Local</option>
            </select></h2>
        </div>
        <div className="content">
          <div className="graph-desc">
            <p>
              Ce graphique représente le prix moyen du m². <br />
              <br />
              Il est possible de trier les données seulement pour{" "} 
              <span className={type == 'appartement' ? 'active' : ''}>les appartements</span>,{" "}
              <span className={type == 'maison' ? 'active' : ''}>les maisons</span>,{" "}
              <span className={type == 'dependance' ? 'active' : ''}>les dépendances</span>,{" "}
              <span className={type == 'local' ? 'active' : ''}>les locaux</span> ou{" "}
              <span className={type == null || type == "" ? 'active' : ''}>la totalité</span>. <br />
              <br />
              Les données sont issues des{" "}
              <a target="_blank" className="link" href="https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/"><span>Demandes de valeurs foncières</span></a>.
            </p>
          </div>

          {loading && <div className="loading">Loading ...</div>}

          {!loading && 
            <div className="graph">
              <LineChart
                svgProps={{
                  margin: { top: 80, bottom: 80, left: 80, right: 80 },
                  width: 800,
                  height: 400,
                }}
                axisProps={{
                  yLabel: "K€",
                }}
                data={lineChartData}
                strokeWidth={3}
              />
            </div>
          }
        </div>
      </section>
    </div>
  );
};

export default PrixMoyen;
