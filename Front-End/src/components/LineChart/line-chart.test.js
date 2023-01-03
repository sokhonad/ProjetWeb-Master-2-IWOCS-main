import { render } from "@testing-library/react";
import { DateTime } from "luxon";
import React from "react";
import { capitalize } from "../../helpers/string";
import mockData from "../../mock/line-chart-data.json";
import LineChart from "./index";

const chartContentPath =
  "M6.611570247933855,356.04395604395603C50.688705234159755,364.83516483516485,94.76584022038566,373.6263736263736,138.84297520661156,373.6263736263736C182.92011019283746,373.6263736263736,226.99724517906336,309.52380952380946,271.07438016528926,281.3186813186813C315.1515151515152,253.11355311355308,359.22865013774106,251.28205128205127,403.305785123967,204.39560439560438C447.38292011019286,157.5091575091575,491.4600550964188,0,535.5371900826447,0C579.6143250688706,0,623.6914600550964,172.52747252747253,667.7685950413223,345.05494505494505";

describe("line chart", () => {
  let lineChartRender;
  let chartSvg;

  beforeAll(() => {
    const lineChartMockData = mockData.map((d, i) => {
      const date = new Date(d.date);
      const dt = DateTime.fromJSDate(date);
      const formatedDate = capitalize(
        dt.toLocaleString({
          month: "long",
          year: "numeric",
        })
      );

      return {
        value: parseInt(d.price, 10),
        label: formatedDate,
        index: i,
        tooltipContent: `${formatedDate}<br><b>Prix moyen du m²: </b>${d.price}K €`,
      };
    });

    lineChartRender = render(
      <LineChart
        svgProps={{
          margin: { top: 80, bottom: 80, left: 80, right: 80 },
          width: 800,
          height: 400,
        }}
        axisProps={{
          yLabel: "K€",
        }}
        data={lineChartMockData}
        strokeWidth={3}
      />
    );
  });

  test("svg chart", () => {
    chartSvg = lineChartRender.getByTestId("chart-svg");

    expect(chartSvg.nodeName).toBe("svg");
    expect(chartSvg.getAttribute("width")).toBe((800 + 80 + 80).toString()); // width + margin
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
    expect(yLabel.textContent).toBe("K€");
  });

  test("chart content", () => {
    const chartContent = chartSvg.children[0].children[3];

    expect(chartContent.nodeName).toBe("path");
    expect(chartContent.getAttribute("d")).toBe(chartContentPath);
  });
});
