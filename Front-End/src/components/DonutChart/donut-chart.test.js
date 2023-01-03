import { render } from "@testing-library/react";
import React from "react";
import mockData from "../../mock/donut-chart-data.json";
import DonutChart from "./index";

describe("donut chart", () => {
  let donutChartRender;
  let chartSvg;

  beforeAll(() => {
    const donutChartMockData = mockData.map((d, i) => {
      return {
        value: d.sales,
        label: `${d.region} (${d.sales})`,
        index: i,
      };
    });

    donutChartRender = render(
      <DonutChart containerId="donut-chart" data={donutChartMockData} />
    );
  });

  test("svg chart", () => {
    chartSvg = donutChartRender.getByTestId("chart-svg");

    expect(chartSvg.nodeName).toBe("svg");
  });

  test("chart container", () => {
    const [chartContainer] = chartSvg.children;

    expect(chartContainer.nodeName).toBe("g");
  });

  test("chart parts", () => {
    const chartContent = chartSvg.children[0];

    // donut parts
    const paths = Array.from(chartContent.children).filter(
      (n) => n.nodeName === "path"
    );
    expect(paths.length).toBe(13);

    // Labels
    const texts = Array.from(chartContent.children).filter(
      (n) => n.nodeName === "text"
    );
    expect(texts.length).toBe(13);
  });
});
