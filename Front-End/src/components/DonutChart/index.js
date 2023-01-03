// @flow weak
import * as d3 from "d3";
import React, { useEffect } from "react";

const DonutChart = (props) => {
  const { data, containerId } = props;

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    // Remove the old chart
    d3.select(`#${containerId}`).select("svg").remove();

    // Remove the old tooltip
    d3.select(`#${containerId}`).select(".tooltip").remove();

    const width = 600;
    const height = 600;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = Math.min(width, height);

    // append the svg object to the div called 'my_dataviz'
    const svg = d3
      .select(`#${containerId}`)
      .append("svg")
      .attr("data-testid", "chart-svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr(
        "transform",
        "translate(" + width / 2 + "," + height / 2 + ")"
      );

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value(({ value }) => value);

    const data_ready = pie(data);

    // The arc generator
    const arc = d3
      .arc()
      .innerRadius(radius * 0.2) // This is the size of the donut hole
      .outerRadius(radius * 0.4);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("id", ({data}) => "element_" + data.index)
      .attr("d", arc)
      .attr("fill", "#6E737D")
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .on("mouseenter", (_, d) => {
        svg
          .select("#element_" + d)  
          .attr("fill", "#58E08F");
          
        svg
          .select("#label_" + d)
          .attr("visibility", "visible");
      })
      .on("mouseleave", (_, d) => {
        svg
          .select("#element_" + d)  
          .attr("fill", "#6E737D");

        svg
          .select("#label_" + d)
          .attr("visibility", "hidden");
      });

    // Add the polylines between chart and labels:
    svg
      .selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(({ data }) => data.label)
      .attr("stroke", "#24292F")
      .attr("transform", (d) => {
        return "translate( 50% )";
      })
      .attr("id", ({data}) => "label_" + data.index)
      .attr("visibility", "hidden")
      .style("text-anchor", "middle");
  };

  return <div id={containerId} className="container" />;
};

export default DonutChart;
