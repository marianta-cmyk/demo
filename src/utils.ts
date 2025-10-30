export function memoizeDomain<Args extends unknown[], Value>(
	fn: (...args: Args) => Value,
) {
	const cache = new Map<string, Value>();
	return (...args: Args) => {
		const key = JSON.stringify(args);
		const value = cache.get(key);
		if (value) {
			return value;
		} else {
			const result = fn(...args);
			cache.set(key, result);
			return result;
		}
	};
}
export function memoizeRange<
	Args extends unknown[],
	Value extends string | number,
>(fn: (...args: Args) => Value) {
	const cache = new Set<Value>();
	return (...args: Args): Value => {
		while (true) {
			const value = fn(...args);
			if (!cache.has(value)) {
				cache.add(value);
				return value;
			}
		}
	};
}
