import http from "k6/http";
import { group, check, sleep } from "k6";
import type { Payment, PaymentItem } from "./bpay";
import { PaymentPaymentMethodEnum } from "./bpay";
import { Options } from "k6/options";
import { getToken, Options as BpayOptions } from "./helper";

const BASE_URL = "https://sandbox.api.bpaygroup.com.au/payments/v1";
// Sleep duration between successive requests.
// You might want to edit the value of this variable or remove calls to the sleep function on the script.
const SLEEP_DURATION = 0.1;
// Global variables should be initialized.

export let options: Options = {
  vus: 1, //no. of concurrent visual users
  duration: "1s",
  // httpDebug: "true",
};

export function setup() {
  const options: BpayOptions = {
    clientId: `${__ENV.CLIENT_ID}`,
    clientSecret: `${__ENV.CLIENT_SECRET}`,
    domain: "https://sandbox.api.bpaygroup.com.au",
  };
  try {
    return getToken(options);
  } catch (error) {
    return "";
  }
}

//desctructing assigment here and explicit type annotation
export default function ({ access_token = "" }: { access_token: string }) {
  group("/validatepayments", () => {
    let url = BASE_URL + `/validatepayments`;
    // Request No. 1
    // TODO: edit the parameters of the request body.
    const payment: Payment = {
      billerCode: "565572",
      crn: "651234567890123",
      amount: 234.83,
      paymentMethod: PaymentPaymentMethodEnum.Debit,
      settlementDate: "2017-10-23",
    };
    const payment1: Payment = {
      billerCode: "1313",
      crn: "1230",
      amount: 1045.98,
      paymentMethod: PaymentPaymentMethodEnum.Debit,
      settlementDate: "2017-11-06",
    };
    const paymentItem: PaymentItem = { tid: "1", payment };
    const paymentItem1: PaymentItem = { tid: "2", payment: payment1 };
    const payments: Array<PaymentItem> = [];
    payments.push(paymentItem);
    payments.push(paymentItem1);
    const payload = { payments };
    let params = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    };
    let request = http.post(url, JSON.stringify(payload), params);
    check(request, {
      "Response to indicate the request was successfully processed. Note that the order of the results should not\
             be relied on to co-relate the response with the original request, rather use the \"tid\" included in the response for the co-relation. \
            Note that the response is considered a 'success' (error code 200) regardless of whether \
            the included payments are validated successfully or not.":
        (r) => r.status === 200,
    });
    sleep(SLEEP_DURATION);
  });
}
