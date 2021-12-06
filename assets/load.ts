import { sleep, check } from "k6";
import { Options } from "k6/options";
import http, { Response } from "k6/http";

export let options: Options = {
  discardResponseBodies: true, //discard response bodies to improve perf
  //if you want to fail the whole load test use thresholds
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1500"],
  },
   stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};
