export interface Envs {
  [key: string]: Env;
}

export interface Env {
  api_url: string;
}

export const envs: Envs = {
  local: {
    api_url: "http://localhost:8090",
  } as Env,
  dev: {
    api_url: "http://bin.org/greetings-api",
  } as Env,
  docker: {
    api_url: "http://host.docker.internal:8090",
  },
};
