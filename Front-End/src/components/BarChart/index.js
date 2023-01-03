import classnames from "classnames";
import * as d3 from "d3";
import BaseChart from "../BaseChart";

function drawBarChart(props) {
  const { svgRef, data, xScale, yScale, width, height, margin, barClass } =
    props;

  const svg = d3
    .select(svgRef.current)
    .attr("data-testid", "chart-svg")
    .select("g");

  svg
    .selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", classnames(["bar-chart__bar", barClass]))
    .attr("fill", "#58E08F")
    .attr("x", (d) => xScale(d.label))
    .attr("width", xScale.bandwidth())
    .attr("y", (d) => yScale(d.value))
    .attr("height", (d) => height - yScale(d.value));
}

const extraProps = {
  useScaleBands: { x: true, y: false },
};

export default BaseChart(drawBarChart, extraProps);
