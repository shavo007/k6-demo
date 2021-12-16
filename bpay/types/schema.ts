/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/validatepayments": {
    /**
     * The Validate BPAY Payment API validates a set of one or more BPAY payment data records to ensure that all attributes are valid, and that the payment will be accepted for processing.
     * *Authentication Required - The endpoint must always be invoked by a user with a valid access token.*
     *
     * **For scenarios to test in the 'Try this API' feature, refer to the Testing Guide [here.](/guides)**
     *
     * **Try our API products using Postman, refer to the Postman collections [here.](/postman)**
     */
    post: operations["postValidatePayments"];
  };
}

export interface components {
  schemas: {
    ValidationPayment: {
      payments?: components["schemas"]["PaymentItem"][];
    };
    /** A response to a request to validate single or multiple BPAY payments */
    ValidationResult: {
      /** The results of the validation of the payment/s. */
      validationResults?: components["schemas"]["ValidatonResultItem"][];
    };
    Error: {
      /** The error code identifying the error type. */
      error?: string;
      /** Indicates the description error. */
      errorDescription?: string;
    };
    ClientErrorItem: {
      /** The error code identifying the format error. */
      errCode?: string;
      /** Identifies the field that caused the error. For example "CRN". */
      errField?: string;
      /** Indicates the description error. For example invalid field format. */
      errMessage?: string;
    };
    ClientError: {
      /** The end point application that made the API call */
      endpoint?: string;
      /** HTTP method used for request (GET, POST, etc) */
      httpmethod?: string;
      /** Summary of the error returned. The end point must make use of the error code, error message and field to form a meaningful response to the end user. */
      errorSummary?: components["schemas"]["ClientErrorItem"][];
    };
    /** Represents the outcome of validating the details of an individual BPAY payment */
    ValidatonResultItem: {
      /** Unique identifier for the BPAY payment being validated. This corresponds to the "tid" supplied in the corresponding PaymentValidationRequest. */
      tid?: string;
      /** The collection of batch payments to be included in the batch file. Note that a maximum of 200 payments can be processed in a single request. */
      validationSummary?: components["schemas"]["ValidationSummary"][];
    };
    /** Error code and description for an invalid payment detail request. */
    ValidationSummary: {
      /**
       * Returns a response code that indicates the result of validation. A value of '0' indicates that the transaction passed validation. Any non-zero value indicates that the payment failed validation.
       *   * 107
       *   * 109
       *   * 113
       *   * 115
       *   * 116
       *   * 122
       *   * 128
       *   * 130
       *   * 131
       *   * 132
       *   * 133
       *   * 140
       */
      validationResponseCode?: string;
      /**
       * If the transaction did not pass validation, then a human readable description of the validation error will be provided.
       * * 107 - The BPAY Biller code is not valid. Please check your entry and try again.
       * * 109 - The Payment Method is not accepted by the Biller. Please enter a different Payment Method.
       * * 113 - The BPAY Customer Reference Number you have entered is not valid. Please check your entry and try again.
       * * 115 - The amount entered is not numeric. Please remove any special characters such as ',' or '$' and try again.
       * * 116 - The amount entered is less than the minimum amount accepted by the Biller.  Please enter a higher amount and try again.
       * * 122 - The Payment Date is invalid. Please enter a different date.
       * * 128 - The Settlement Date is invalid. Please enter a different date.
       * * 130 - The length of the supplied BPAY Customer Reference Number is not valid for this Biller. Please check your entry and try again.
       * * 131 - The amount you have entered is not correct or not accepted by the Biller. Please check your entry and try again.
       * * 132 - Only numeric values are allowed for BPAY Customer Reference Number.  Please remove any special characters such as '-' or '_' or spaces and try again.
       * * 133 - The Payment Date you have entered is not correct or has past the date accepted by the Biller. Please check your entry and try again.
       * * 140 - The amount entered is more than the maximum amount accepted by the Biller. Please enter a lower amount and try again.
       */
      validationErrorDescription?: string;
    };
    PaymentItem: {
      /** A unique identifier for the BPAY payment item being validated. This will be returned back in the response and can be used for correlating the response and request object elements. It must therefore be unique for each payment detail within the request. */
      tid: string;
      payment: components["schemas"]["Payment"];
    };
    Payment: {
      /** The Biller Code for the biller that will receive the payment. The Biller Code must be  a numeric value with 3 to 10 digits. */
      billerCode: string;
      /** The Customer Reference Number (CRN) for the payment. The CRN must contain numeric values but should be treated as a string as it may have leading zeros (which must be preserved). The CRN must contain between 2 and 20 digits. */
      crn: string;
      /** The amount of the payment. */
      amount: number;
      /**
       * The date that the proposed payment will be submitted by the Financial Institution to BPAY for inclusion in settlement. Financial Institutions determine their own cut-off times each day for accepting payments to be submitted on the same day (typically between 3pm-6pm). Please consult with your Financial Institution regarding their BPAY Payment settlement cut-off time. The format of the date should be as defined by full-date in [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14).
       *
       * For example, consider the case where your Financial Institution’s cut-off time is 4pm.
       *
       * * If you are submitting the transaction to your Financial Institution at 3pm, you are submitting before their cut-off and so it will be submitted to BPAY on the same day for inclusion in settlement. You should use the current day’s date as the ‘Settlement Date’ when calling the API.
       * * If you are submitting the transaction to your Financial Institution at 6pm, you are submitting after their cut-off and so it will be submitted to BPAY on the following day for inclusion in settlement. You should use the next day’s date as the ‘Settlement Date’ when calling the API
       */
      settlementDate: string;
      /** The type of payments methods accepted by the biller. For PaymentValidationRequest, values can be "001" (Debit), "101" (Visa), "201" (MasterCard), "301" (Other Credit Card). For GenerateBatchFileRequest, paymentMethod must be "001". Note that Billers are able to define the account types from which they will accept payment. The account type will be used to validate that the biller accepts payments from that type of account. */
      paymentMethod: "001" | "101" | "201" | "301";
      /** The date that the proposed payment will be submitted by the customer to their Financial Institution for processing. Note that in the case of Batch Payers, this will need to correspond to the date that the Batch Payer submits the transaction to their FI for processing, not when the Batch Payer initially accepted it from their customer. This is used in those cases where the CRN includes an embedded due date. In such cases, the payment fails validation if the supplied Payment Date is after the Expiry Date extracted from the CRN. This field is optional and if its not provided will default to the current date. The format of the date should be as defined by full-date in [RFC3339](https://xml2rfc.tools.ietf.org/public/rfc/html/rfc3339.html#anchor14). */
      paymentDate?: string;
    };
  };
}

export interface operations {
  /**
   * The Validate BPAY Payment API validates a set of one or more BPAY payment data records to ensure that all attributes are valid, and that the payment will be accepted for processing.
   * *Authentication Required - The endpoint must always be invoked by a user with a valid access token.*
   *
   * **For scenarios to test in the 'Try this API' feature, refer to the Testing Guide [here.](/guides)**
   *
   * **Try our API products using Postman, refer to the Postman collections [here.](/postman)**
   */
  postValidatePayments: {
    responses: {
      /** Response to indicate the request was successfully processed. Note that the order of the results should not be relied on to co-relate the response with the original request, rather use the "tid" included in the response for the co-relation. Note that the response is considered a 'success' (error code 200) regardless of whether the included payments are validated successfully or not. */
      200: {
        content: {
          "application/json": components["schemas"]["ValidationResult"];
        };
      };
      /**
       * The request was invalid and the data supplied did not match the expected formats. Possible errors include:
       * * DUPLICATE_TIDS - Duplicate identifiers found.
       * * TID_MISSING - An identifier is required.
       * * PAYMENTS_MISSING - Payment details are required.
       */
      400: {
        content: {
          "application/json": components["schemas"]["ClientError"];
        };
      };
      /** User is not authenticated. */
      401: {
        content: {
          "application/json": components["schemas"]["Error"];
        };
      };
      /** User is authenticated but does not have sufficient permissions to use this service. */
      403: {
        content: {
          "application/json": components["schemas"]["Error"];
        };
      };
      /** The number of payment records exceeds the limit. */
      413: {
        content: {
          "application/json": components["schemas"]["ClientError"];
        };
      };
      /** Unexpected error was encountered processing the request. */
      500: unknown;
    };
    /** The payment details that are being submitted for validation. */
    requestBody: {
      content: {
        "application/json": components["schemas"]["ValidationPayment"];
      };
    };
  };
}

export interface external {}