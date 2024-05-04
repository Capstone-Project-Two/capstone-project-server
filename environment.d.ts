declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      ENV_MODE: string;
    }
  }
}

export {};
