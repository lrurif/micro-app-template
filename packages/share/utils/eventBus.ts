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

/**
 * 创建一个任务队列，多个相同的同步任务在一次事件循环中只执行一次
 * @returns 
 */
export function createQueue() {
    const queue = new Set();
    let isFlushing = false;
    const p = Promise.resolve();
    return function (fn) {
        queue.add(fn);
        if (!isFlushing) {
            isFlushing = true;
            p.then(() => {
                queue.forEach((item: any) => {
                    item();
                })
            }).finally(() => {
                isFlushing = false
            })

        }
    }
}