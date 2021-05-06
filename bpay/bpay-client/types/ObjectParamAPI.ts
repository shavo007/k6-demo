import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { ClientError } from '../models/ClientError';
import { ClientErrorItem } from '../models/ClientErrorItem';
import { ModelError } from '../models/ModelError';
import { Payment } from '../models/Payment';
import { PaymentItem } from '../models/PaymentItem';
import { ValidationPayment } from '../models/ValidationPayment';
import { ValidationResult } from '../models/ValidationResult';
import { ValidationSummary } from '../models/ValidationSummary';
import { ValidatonResultItem } from '../models/ValidatonResultItem';

import { ObservableBpayApi } from "./ObservableAPI";
import { BpayApiRequestFactory, BpayApiResponseProcessor} from "../apis/BpayApi";

export interface BpayApiPostValidatePaymentsRequest {
    /**
     * The payment details that are being submitted for validation.
     * @type ValidationPayment
     * @memberof BpayApipostValidatePayments
     */
    validationPayment: ValidationPayment
}

export class ObjectBpayApi {
    private api: ObservableBpayApi

    public constructor(configuration: Configuration, requestFactory?: BpayApiRequestFactory, responseProcessor?: BpayApiResponseProcessor) {
        this.api = new ObservableBpayApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * The Validate BPAY Payment API validates a set of one or more BPAY payment data records to ensure that all attributes are valid, and that the payment will be accepted for processing. *Authentication Required - The endpoint must always be invoked by a user with a valid access token.*  **For scenarios to test in the 'Try this API' feature, refer to the Testing Guide [here.](/guides)**  **Try our API products using Postman, refer to the Postman collections [here.](/postman)**
     * @param param the request object
     */
    public postValidatePayments(param: BpayApiPostValidatePaymentsRequest, options?: Configuration): Promise<ValidationResult> {
        return this.api.postValidatePayments(param.validationPayment,  options).toPromise();
    }

}
