export declare const KEY_RENDERED: unique symbol;
export declare const KEY_ON_RENDERED_CHANGE: unique symbol;
export declare function Observer<T extends Function>(componentClass: T): T;
export declare namespace Observer {
    var KEY_RENDERED: typeof import("./cellx-react").KEY_RENDERED;
    var KEY_ON_RENDERED_CHANGE: typeof import("./cellx-react").KEY_ON_RENDERED_CHANGE;
}
export { Observer as observer };
