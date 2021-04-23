import { sleep, check } from 'k6'
import { Options } from 'k6/options'
import http from 'k6/http'
// import {
//   jUnit,
//   textSummary,
// } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'


const BASE_URL = 'http://localhost:8090'

export let options: Options = {
  vus: 50,
  duration: '10s',
}

export default () => {
  let url = BASE_URL + `/greetings`
  const res = http.get(url)
  check(res, {
    'status is 200': () => res.status === 200,
  })
  sleep(1)
}


// export function handleSummary(data) {
//   console.log('Preparing the end-of-test summary...')
//   // Send the results to some remote server or trigger a hook

//   return {
//     stdout: textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
//     'results/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
//     'results/summary.json': JSON.stringify(data), // and a JSON with all the details...
//     // And any other JS transformation of the data you can think of,
//     // you can write your own JS helpers to transform the summary data however you like!
//   }
// }


