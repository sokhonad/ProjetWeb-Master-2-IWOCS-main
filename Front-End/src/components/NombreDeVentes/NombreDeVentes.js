import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { capitalize } from "../../helpers/string";
import BarChart from "../BarChart";
import NavBar from "../NavBar/NavBar";

const PrixMoyen = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [group, setGroup] = useState("day");
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const url = new URL("http://127.0.0.1:8000/api/land/barchart");

    const params = { group };

    if (start) params.start = start;
    if (end) params.end = end;

    url.search = new URLSearchParams(params).toString();

    setLoading(true);
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.filter((d) => d.year !== "1970");

        const barChartDataTemp = data.map((d, i) => {
          const dt = DateTime.fromObject({
            year: d.year,
            day: d.day,
            month: d.month,
          });
          const formatedDate = capitalize(
            dt.toLocaleString({
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          );

          return {
            value: d.sales,
            label: formatedDate,
            index: i,
            tooltipContent: `${formatedDate}<br><b>Ventes: </b>${d.sales}`,
          };
        });

        setBarChartData(barChartDataTemp);
        setLoading(false);
      });
  }, [group, end, start]);

  const groupChanged = (event) => {
    setGroup(event.target.value);
  };

  const startChanged = (event) => {
    setStart(event.target.value);
  };

  const endChanged = (event) => {
    setEnd(event.target.value);
  };

  return (
    <div className="chart-page">
      <NavBar />
      <section className="container">
        <div className="titles">
          <h1>Nombre de vente</h1>
          <h2 className="sub-title">Par <select disabled={loading} onChange={groupChanged} style={{ marginBottom: "1rem" }}>
              <option defaultValue value="day">
                Jours
              </option>
              <option value="month">Mois</option>
              <option value="year">Année</option>
            </select></h2>
        </div>
        <div className="content">
          <div className="graph-desc">
            <div style={{ marginBottom: "1rem" }}>
              <div>
                <label htmlFor="start" style={{ marginRight: "1rem" }}>
                  Début
                </label>
                <input  
                  disabled={loading}
                  onChange={startChanged}
                  name="start"
                  id="start"
                  type="date"
                />
              </div>

              <div>
                <label htmlFor="end" style={{ marginRight: "1rem" }}>
                  Fin
                </label>
                <input 
                 disabled={loading} 
                 onChange={endChanged} 
                 name="end" 
                 id="end" 
                 type="date" 
                />
              </div>
            </div>

            <p>
              Ce graphique représente le nombre de vente pour une période donnée. <br />
              <br />
              Il est possible de visualiser les données sur les intervalles suivant : {" "}
              <span className={group == 'day' ? 'active' : ''}>jour</span>, <span className={group == 'month' ? 'active' : ''}>mois</span>, <span  className={group == 'year' ? 'active' : ''}>année</span>. <br />
              <br />
              Les données sont issues des{" "}
              <a target="_blank" className="link" href="https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/"><span>Demandes de valeurs foncières</span></a>.
            </p>
          </div>

          {loading && <div className="loading">Loading ...</div>}
          {!loading && 
            <div className="graph">
              <BarChart
                svgProps={{
                  margin: { top: 80, bottom: 80, left: 80, right: 80 },
                  width: 1000,
                  height: 400,
                }}
                axisProps={{
                  yLabel: "Nombre de ventes",
                }}
                data={barChartData}
                strokeWidth={4}
              />
            </div>
          }
        </div>
      </section>
    </div>
  );
};

export default PrixMoyen;
