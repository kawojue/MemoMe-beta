declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_URI: string
            EMAIL: string
            EMAIL_PSWD: string
            JWT_SECRET: string
        }
    }
}

export {}