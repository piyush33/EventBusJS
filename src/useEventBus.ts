import { useMemo } from 'react';

// Define the type for the event handler
type EventHandler = (...args: any[]) => void;

// Define the interface for the global emitter
interface Emitter {
    subscribe: (event: string, handler: EventHandler) => () => void;
    publish: (event: string, ...args: any[]) => void;
}

// Global emitter variable
let globalEmitter: Emitter | undefined;

export const useEventBus = (): Emitter => {
    if (!globalEmitter) {
        const listeners = new Map<string, EventHandler[]>();

        const subscribe = (event: string, handler: EventHandler): () => void => {
            if (!listeners.has(event)) {
                listeners.set(event, []);
            }
            listeners.get(event)!.push(handler);

            return () => {
                const eventListeners = listeners.get(event);
                if (eventListeners) {
                    listeners.set(
                        event,
                        eventListeners.filter(listener => listener !== handler)
                    );
                }
            };
        };

        const publish = (event: string, ...args: any[]): void => {
            const eventListeners = listeners.get(event);
            if (eventListeners) {
                eventListeners.forEach(listener => listener(...args));
            }
        };

        globalEmitter = { subscribe, publish };
    }

    return globalEmitter;
};
