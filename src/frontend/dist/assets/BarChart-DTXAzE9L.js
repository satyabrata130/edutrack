import { m as generateCategoricalChart, B as Bar, X as XAxis, Y as YAxis, n as formatAxisMap } from "./generateCategoricalChart-DpPC91G4.js";
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
export {
  BarChart as B
};
