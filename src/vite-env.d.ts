/// <reference library="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string
    readonly VITE_WSM_SERVER_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}