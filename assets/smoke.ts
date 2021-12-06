import { sleep, check } from "k6";
import { Options } from "k6/options";
import http, { Response } from "k6/http";

export let options: Options = {
  vus: 1, //no. of concurrent virtual users
  duration: "1m",
  discardResponseBodies: true, //discard response bodies to improve perf
  //if you want to fail the whole load test use thresholds
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<200"],
  }
};
