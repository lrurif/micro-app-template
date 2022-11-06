export default class EventBus {
    events: {
        [key: string]: Set<any>;
    };
    constructor() {
        this.events = {};
    }
    emit(eventName, ...data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(...data);
            });
        }
    }
    on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || new Set();
        this.events[eventName].add(fn);
    }
    once(eventName, fn) {
        const func = () => {
            fn();
            this.off(eventName, func);
        };
        this.on(eventName, func);
    }
    off(eventName, fn) {
        const events = this.events[eventName];
        if (!events) return;
        events.delete(fn);
    }
}
