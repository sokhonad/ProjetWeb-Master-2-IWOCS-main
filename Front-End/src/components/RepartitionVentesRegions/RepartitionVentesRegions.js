import React, { useEffect, useState } from "react";
import DonutChart from "../DonutChart";
import NavBar from "../NavBar/NavBar";

const PrixMoyen = () => {
  const [donutChartData, setDonutChartData] = useState([]);
  const [year, setYear] = useState(2020);
  const [loading, setLoading] = useState();

  useEffect(() => {
    const url = new URL("http://127.0.0.1:8000/api/land/donutchart");

    url.search = new URLSearchParams({ year }).toString();

    setLoading(true);
    fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const donutChartDataTemp = data.map((d, i) => {
          return {
            value: d.sales,
            label: `${d.region} (${d.sales})`,
            index: i,
          };
        });

        setDonutChartData(donutChartDataTemp);
        setLoading(false);
      });
  }, [year]);

  const yearChanged = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className="chart-page">
      <NavBar />
      <section className="container" style={{ paddingBottom: "2rem" }}>
        <div className="titles" style={{ marginBottom: "1.5rem" }}>
          <h1>Répartition des ventes par régions</h1>
          <h2 className="sub-title">Pour <select disabled={loading} defaultValue={2020} onChange={yearChanged}>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
            </select></h2>
            
        </div>

        <div className="content">
          <div className="graph-desc">
            <p>
              Ce graphique représente la répartition des ventes sur une année.  <br />
              <br />
              Les données sont issues des{" "}
              <a target="_blank" className="link" href="https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/"><span>Demandes de valeurs foncières</span></a>.
            </p>
          </div>
        
          {loading && <div className="loading">Loading ...</div>}
          {!loading &&
            <DonutChart containerId="donut-chart" data={donutChartData} />
          }
        </div>
      </section>
    </div>
  );
};

export default PrixMoyen;
