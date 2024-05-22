declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      ENV_MODE: 'development' | 'staging' | 'production';
      API_BASE_URL: string;
      MONGO_CONNECTION_STRING: string;
      CLIENT_BASE_URL: string;
    }
  }
}

export {};
