// TODO: better import syntax?
import { BaseAPIRequestFactory, RequiredError } from './baseapi';
import {Configuration} from '../configuration';
import { RequestContext, HttpMethod, ResponseContext, HttpFile} from '../http/http';
import * as FormData from "form-data";
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {isCodeInRange} from '../util';

import { ClientError } from '../models/ClientError';
import { ValidationPayment } from '../models/ValidationPayment';
import { ValidationResult } from '../models/ValidationResult';

/**
 * no description
 */
export class BpayApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * The Validate BPAY Payment API validates a set of one or more BPAY payment data records to ensure that all attributes are valid, and that the payment will be accepted for processing. *Authentication Required - The endpoint must always be invoked by a user with a valid access token.*  **For scenarios to test in the 'Try this API' feature, refer to the Testing Guide [here.](/guides)**  **Try our API products using Postman, refer to the Postman collections [here.](/postman)**
     * @param validationPayment The payment details that are being submitted for validation.
     */
    public async postValidatePayments(validationPayment: ValidationPayment, options?: Configuration): Promise<RequestContext> {
        let config = options || this.configuration;

        // verify required parameter 'validationPayment' is not null or undefined
        if (validationPayment === null || validationPayment === undefined) {
            throw new RequiredError('Required parameter validationPayment was null or undefined when calling postValidatePayments.');
        }


        // Path Params
        const localVarPath = '/validatepayments';

        // Make Request Context
        const requestContext = config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params

        // Header Params

        // Form Params


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(validationPayment, "ValidationPayment", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod = null;
        // Apply auth methods
        authMethod = config.authMethods["bpay_auth"]
        if (authMethod) {
            await authMethod.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class BpayApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to postValidatePayments
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async postValidatePayments(response: ResponseContext): Promise<ValidationResult > {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ValidationResult = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationResult", ""
            ) as ValidationResult;
            return body;
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: ClientError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ClientError", ""
            ) as ClientError;
            throw new ApiException<ClientError>(400, body);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(401, body);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: Error = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Error", ""
            ) as Error;
            throw new ApiException<Error>(403, body);
        }
        if (isCodeInRange("413", response.httpStatusCode)) {
            const body: ClientError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ClientError", ""
            ) as ClientError;
            throw new ApiException<ClientError>(413, body);
        }
        if (isCodeInRange("500", response.httpStatusCode)) {
            throw new ApiException<string>(response.httpStatusCode, "Unexpected error was encountered processing the request.");
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ValidationResult = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ValidationResult", ""
            ) as ValidationResult;
            return body;
        }

        let body = response.body || "";
        throw new ApiException<string>(response.httpStatusCode, "Unknown API Status Code!\nBody: \"" + body + "\"");
    }

}
