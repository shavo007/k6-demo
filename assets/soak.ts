import { sleep, check } from "k6";
import { Options } from "k6/options";
import http, { Response } from "k6/http";

export let options: Options = {
  discardResponseBodies: true, //discard response bodies to improve perf
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};
