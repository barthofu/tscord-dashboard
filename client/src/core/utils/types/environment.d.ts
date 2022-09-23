declare global {
    namespace NodeJS {
        interface ProcessEnv {

            NODE_ENV: 'development' | 'production'

            PORT: string
            BASE_URL: string

            NEXT_PUBLIC_WEBSOCKET_PROXY_URL: string
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}