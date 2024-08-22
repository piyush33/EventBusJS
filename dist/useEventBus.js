// Global emitter variable
let globalEmitter;
export const useEventBus = () => {
    if (!globalEmitter) {
        const listeners = new Map();
        const subscribe = (event, handler) => {
            if (!listeners.has(event)) {
                listeners.set(event, []);
            }
            listeners.get(event).push(handler);
            return () => {
                const eventListeners = listeners.get(event);
                if (eventListeners) {
                    listeners.set(event, eventListeners.filter(listener => listener !== handler));
                }
            };
        };
        const publish = (event, ...args) => {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.forEach(listener => listener(...args));
            }
        };
        globalEmitter = { subscribe, publish };
    }
    return globalEmitter;
};
