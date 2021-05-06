import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { ClientError } from '../models/ClientError';
import { ClientErrorItem } from '../models/ClientErrorItem';
import { ModelError } from '../models/ModelError';
import { Payment } from '../models/Payment';
import { PaymentItem } from '../models/PaymentItem';
import { ValidationPayment } from '../models/ValidationPayment';
import { ValidationResult } from '../models/ValidationResult';
import { ValidationSummary } from '../models/ValidationSummary';
import { ValidatonResultItem } from '../models/ValidatonResultItem';

import { BpayApiRequestFactory, BpayApiResponseProcessor} from "../apis/BpayApi";
export class ObservableBpayApi {
    private requestFactory: BpayApiRequestFactory;
    private responseProcessor: BpayApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: BpayApiRequestFactory,
        responseProcessor?: BpayApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new BpayApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new BpayApiResponseProcessor();
    }

    /**
     * The Validate BPAY Payment API validates a set of one or more BPAY payment data records to ensure that all attributes are valid, and that the payment will be accepted for processing. *Authentication Required - The endpoint must always be invoked by a user with a valid access token.*  **For scenarios to test in the 'Try this API' feature, refer to the Testing Guide [here.](/guides)**  **Try our API products using Postman, refer to the Postman collections [here.](/postman)**
     * @param validationPayment The payment details that are being submitted for validation.
     */
    public postValidatePayments(validationPayment: ValidationPayment, options?: Configuration): Observable<ValidationResult> {
        const requestContextPromise = this.requestFactory.postValidatePayments(validationPayment, options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.postValidatePayments(rsp)));
            }));
    }
 
}
