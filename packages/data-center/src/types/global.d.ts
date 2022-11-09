declare global {
    interface Window {
        microApp?: any;
        __MICRO_APP_NAME__?: string;
        __MICRO_APP_ENVIRONMENT__?: string;
        __MICRO_APP_BASE_ROUTE__?: string;
        openMenu: any;
        closeMenu: any;
        Vue: any;
    }
}
export {};
// // 另一种方法，不能导出-start
// export declare interface Window{
// 	microApp: any;
// 	__MICRO_APP_NAME__: string;
// 	__MICRO_APP_ENVIRONMENT__: string;
// 	__MICRO_APP_BASE_ROUTE__: string;
// }
// export declare interface aa {
//     name: string;
//     age: number
// }
// // 另一种方法，不能导出-end
