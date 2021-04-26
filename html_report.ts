import { generateSummaryReport } from "k6-html-reporter";

const options = {
  jsonFile: "./results/summary.json",
  output: "./results",
};

generateSummaryReport(options);
