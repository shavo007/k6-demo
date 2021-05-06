export interface PaymentItem {
  /**
   * A unique identifier for the BPAY payment item being validated. This will be returned back in the response and can be used for correlating the response and request object elements. It must therefore be unique for each payment detail within the request.
   */
  tid: string;
  payment: Payment;
}
export interface Payment {
  /**
   * The Biller Code for the biller that will receive the payment. The Biller Code must be  a numeric value with 3 to 10 digits.
   */
  billerCode: string;
  /**
   * The Customer Reference Number (CRN) for the payment. The CRN must contain numeric values but should be treated as a string as it may have leading zeros (which must be preserved). The CRN must contain between 2 and 20 digits.
   */
  crn: string;
  /**
   * The amount of the payment.
   */
  amount: number;
  /**
   * The date that the proposed payment will be submitted by the Financial Institution to BPAY for inclusion in settlement. Financial Institutions determine their own cut-off times each day for accepting payments to be submitted on the same day (typically between 3pm-6pm). Please consult with your Financial Institution regarding their BPAY Payment settlement cut-off time. The format of the date should be as defined by full-date in [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14).  For example, consider the case where your Financial Institution’s cut-off time is 4pm.  * If you are submitting the transaction to your Financial Institution at 3pm, you are submitting before their cut-off and so it will be submitted to BPAY on the same day for inclusion in settlement. You should use the current day’s date as the ‘Settlement Date’ when calling the API. * If you are submitting the transaction to your Financial Institution at 6pm, you are submitting after their cut-off and so it will be submitted to BPAY on the following day for inclusion in settlement. You should use the next day’s date as the ‘Settlement Date’ when calling the API
   */
  settlementDate: string;
  /**
   * The type of payments methods accepted by the biller. For PaymentValidationRequest, values can be \"001\" (Debit), \"101\" (Visa), \"201\" (MasterCard), \"301\" (Other Credit Card). For GenerateBatchFileRequest, paymentMethod must be \"001\". Note that Billers are able to define the account types from which they will accept payment. The account type will be used to validate that the biller accepts payments from that type of account.
   */
  paymentMethod: PaymentPaymentMethodEnum;
  /**
   * The date that the proposed payment will be submitted by the customer to their Financial Institution for processing. Note that in the case of Batch Payers, this will need to correspond to the date that the Batch Payer submits the transaction to their FI for processing, not when the Batch Payer initially accepted it from their customer. This is used in those cases where the CRN includes an embedded due date. In such cases, the payment fails validation if the supplied Payment Date is after the Expiry Date extracted from the CRN. This field is optional and if its not provided will default to the current date. The format of the date should be as defined by full-date in [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14).
   */
  paymentDate?: string;
}

export enum PaymentPaymentMethodEnum {
  Debit = "001",
  Visa = "101",
  MasterCard = "201",
  Other = "301",
}
