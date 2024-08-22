type EventHandler = (...args: any[]) => void;
interface Emitter {
    subscribe: (event: string, handler: EventHandler) => () => void;
    publish: (event: string, ...args: any[]) => void;
}
export declare const useEventBus: () => Emitter;
export {};
