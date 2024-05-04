declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      ENV_MODE: string;
      API_BASE_URL: string;
    }
  }
}

export {};
