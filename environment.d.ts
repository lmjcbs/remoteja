declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_ID: string
      GITHUB_SECRET: string
      SMTP_HOST: string
      SMTP_PORT: number
      SMTP_USER: string
      SMTP_PASSWORD: string
    }
  }
}

export {}
