import type { MicroApp } from "@micro-zoe/micro-app";
declare global {
    interface Window {
        microApp: MicroApp;
        __MICRO_APP_NAME__: string;
        __MICRO_APP_ENVIRONMENT__: string;
        __MICRO_APP_BASE_ROUTE__: string;
    }
}
export {};
