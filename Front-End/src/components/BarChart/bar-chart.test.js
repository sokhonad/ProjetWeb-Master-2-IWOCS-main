import { render } from "@testing-library/react";
import { DateTime } from "luxon";
import React from "react";
import { capitalize } from "../../helpers/string";
import mockData from "../../mock/bar-chart-data.json";
import BarChart from "./index";

describe("bar chart", () => {
  let barChartRender;
  let chartSvg;

  beforeAll(() => {
    const barChartMockData = mockData.map((d, i) => {
      const dt = DateTime.fromObject({
        year: d.year,
        day: d.day,
        month: d.month,
      });
      const formatedDate = capitalize(
        dt.toLocaleString({
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

    barChartRender = render(
      <BarChart
        svgProps={{
          margin: { top: 80, bottom: 80, left: 80, right: 80 },
          width: 1000,
          height: 400,
        }}
        axisProps={{
          yLabel: "Nombre de ventes",
        }}
        data={barChartMockData}
        strokeWidth={4}
      />
    );
  });

  test("svg chart", () => {
    chartSvg = barChartRender.getByTestId("chart-svg");

    expect(chartSvg.nodeName).toBe("svg");
    expect(chartSvg.getAttribute("width")).toBe((1000 + 80 + 80).toString()); // width + margin
    expect(chartSvg.getAttribute("height")).toBe((400 + 80 + 80).toString()); // height + margin
  });

  test("chart container", () => {
    const [chartContainer] = chartSvg.children;

    expect(chartContainer.nodeName).toBe("g");
    expect(chartContainer.getAttribute("transform")).toBe("translate(80,80)"); // margin
  });

  test("chart axis", () => {
    const [xAxis, yAxis, yLabel] = chartSvg.children[0].children;

    expect(xAxis.nodeName).toBe("g");
    expect(xAxis.getAttribute("class")).toBe("base__axis axis__x");

    expect(yAxis.nodeName).toBe("g");
    expect(yAxis.getAttribute("class")).toBe("base__axis axis__y");

    expect(yLabel.nodeName).toBe("text");
    expect(yLabel.textContent).toBe("Nombre de ventes");
  });

  test("chart content", () => {
    const chartContent = chartSvg.children[0];

    const rects = Array.from(chartContent.children).filter(
      (n) => n.nodeName === "rect"
    );

    expect(rects.length).toBe(mockData.length + 1); // 6 bars + 1 rect for d3.js overlay
  });
});
