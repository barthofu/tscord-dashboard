declare global {
    namespace NodeJS {
        interface ProcessEnv {

            NODE_ENV: 'development' | 'production'

            BOT_API_URL_PROD: string
            BOT_API_URL_DEV: string
            BOT_API_TOKEN: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}