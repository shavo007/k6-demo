import { b64encode } from "k6/encoding";
import http, { Params, RequestBody } from "k6/http";

export interface Options {
  domain: string;
  clientId: string;
  clientSecret: string;
}

const getToken = ({ domain, clientId, clientSecret }: Options) => {
  let url = `${domain}/oauth/token`;
  const requestBody: RequestBody = {};
  let response;
  requestBody["grant_type"] = "client_credentials";
  const encodedCredentials = b64encode(`${clientId}:${clientSecret}`);
  const params: Params = {
    auth: "basic",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  };
  response = http.post(url, requestBody, params);
  return response.json();
};

export { getToken };
