declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWITTER_API_KEY: string
      TWITTER_API_SECRET: string
      TWITTER_BEARER_TOKEN: string
      TWITTER_ACCESS_TOKEN_KEY: string
      TWITTER_ACCESS_TOKEN_KEY_SECRET: string
      SMTP_HOST: string
      SMTP_PORT: number
      SMTP_USER: string
      SMTP_PASSWORD: string
    }
  }
}

export {}
