declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EMAIL: string
            DB_URI: string
            EMAIL_PSWD: string
            JWT_SECRET: string
            STRING_KEY: string
            AUTH_CLIENT_ID: string
        }
    }
}

export {}