declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      REDIS_URL: string;
      CORS_ORIGIN: string;
      SESSION_SECRET: string;
    }
  }
}

export {}
