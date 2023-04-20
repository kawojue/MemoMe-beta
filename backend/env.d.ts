declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EMAIL: string
            DB_URI: string
            EMAIL_PSWD: string
            JWT_SECRET: string
            STRING_KEY: string
            CLOUD_NAME: string
            CLOUD_API_KEY: string
            AUTH_CLIENT_ID: string
            CLOUD_API_SECRET: string
        }
    }
}

export {}