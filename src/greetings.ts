import { sleep, check } from "k6";
import { Options } from "k6/options";
import http, { Response } from "k6/http";
import { padStart } from "lodash";
import { textSummary } from "./helper";

// const BASE_URL = "http://localhost:8090";
// const BASE_URL = "http://host.docker.internal:8090";
// const BASE_URL = "http://greetings:8090";
console.log(padStart("Hello TypeScript!", 20, " "));

export let options: Options = {
  vus: 5, //no. of concurrent virtual users
  duration: "5s",
  discardResponseBodies: true, //discard response bodies to improve perf
  //if you want to fail the whole load test use thresholds
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<350"], // 95% of requests should be below 200ms
  },
  // httpDebug: "true",
  userAgent: "K6GreetingsDemo/1.0",
  // The following config would have k6 ramping up from 1 to 10 VUs for 3 minutes,
  // then staying flat at 10 VUs for 5 minutes, then ramping up from 10 to 35 VUs
  // over the next 10 minutes before finally ramping down to 0 VUs for another
  // 3 minutes.
  // stages: [
  //   { duration: "3m", target: 10 },
  //   { duration: "5m", target: 10 },
  //   { duration: "10m", target: 35 },
  //   { duration: "3m", target: 0 },
  // ],
};

export default () => {
  let baseUrl = __ENV.BASE_URL ?? "http://localhost:8090";
  let url = `${baseUrl}/greetings`;
  const res: Response = http.get(url, {
    tags: { team: "digix", api: "greetings" },
  });
  check(res, {
    "status is 200": () => res.status === 200,
    "includes response header Content-Type": () =>
      res.headers["Content-Type"] === "application/json",
  });
  sleep(1);
};

export function handleSummary(data: any) {
  console.log("Preparing the end-of-test summary...");

  // Send the results to some remote server or trigger a hook

  return {
    stdout: textSummary(data, { indent: " ", enableColors: true }), // Show the text summary to stdout...
    // 'results/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
    // "results/summary.json": JSON.stringify(data), // and a JSON with all the details...
    // 'results/summary.html': generateSummaryReport(options), // and a JSON with all the details...
    // And any other JS transformation of the data you can think of,
    // you can write your own JS helpers to transform the summary data however you like!
  };
}
