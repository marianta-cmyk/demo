export type Observer<Value> = (value: Value) => void;
export type Subscription = {
	unsubscribe: () => void;
};
export class Observable<Value> implements Subscription {
	readonly #observers = new Set<Observer<Value>>();
	notify(value: Value): void {
		for (const observer of this.#observers) {
			observer(value);
		}
	}
	subscribe(observer: Observer<Value>): Subscription {
		this.#observers.add(observer);
		return {
			unsubscribe: () => {
				this.#observers.delete(observer);
			},
		};
	}
	unsubscribe(): void {
		this.#observers.clear();
	}
}
export function createBus<const EventsById extends Record<string, unknown>>() {
	const observablesById: {
		[Id in keyof EventsById]?: Observable<EventsById[Id]>;
	} = {};
	function notify<const Id extends keyof EventsById>(
		id: Id,
		value: EventsById[Id],
	): void {
		const observable = observablesById[id];
		observable?.notify(value);
	}
	function subscribe<const Id extends keyof EventsById>(
		id: Id,
		fn: Observer<EventsById[Id]>,
	): Subscription {
		const observable = observablesById[id] ?? new Observable<EventsById[Id]>();
		const subscription = observable.subscribe(fn);
		observablesById[id] = observable;
		return subscription;
	}
	function unsubscribe<const Id extends keyof EventsById>(id: Id): void {
		const observable = observablesById[id];
		observable?.unsubscribe();
		observablesById[id] = undefined;
	}
	return {
		notify,
		subscribe,
		unsubscribe,
	} as const;
}
