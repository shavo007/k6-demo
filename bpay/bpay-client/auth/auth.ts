// typings for btoa are incorrect
//@ts-ignore
import * as btoa from "btoa";
import { RequestContext } from "../http/http";

/**
 * Interface authentication schemes.
 */
export interface SecurityAuthentication {
    /*
     * @return returns the name of the security authentication as specified in OAI
     */
    getName(): string;

    /**
     * Applies the authentication scheme to the request context
     *
     * @params context the request context which should use this authentication scheme
     */
    applySecurityAuthentication(context: RequestContext): void | Promise<void>;
}

export interface TokenProvider {
  getToken(): Promise<string> | string;
}

/**
 * Applies oauth2 authentication to the request context.
 */
export class BpayAuthAuthentication implements SecurityAuthentication {
    // TODO: How to handle oauth2 authentication!
    public constructor() {}

    public getName(): string {
        return "bpay_auth";
    }

    public applySecurityAuthentication(context: RequestContext) {
        // TODO
    }
}


export type AuthMethods = {
    "bpay_auth"?: SecurityAuthentication
}

export type ApiKeyConfiguration = string;
export type HttpBasicConfiguration = { "username": string, "password": string };
export type HttpBearerConfiguration = { tokenProvider: TokenProvider };
export type OAuth2Configuration = string;

export type AuthMethodsConfiguration = {
    "bpay_auth"?: OAuth2Configuration
}

/**
 * Creates the authentication methods from a swagger description.
 *
 */
export function configureAuthMethods(config: AuthMethodsConfiguration | undefined): AuthMethods {
    let authMethods: AuthMethods = {}

    if (!config) {
        return authMethods;
    }

    if (config["bpay_auth"]) {
        authMethods["bpay_auth"] = new BpayAuthAuthentication(
        );
    }

    return authMethods;
}