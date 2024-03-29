/**
 * Extracts the keys of `T` that are required.
 * This type iterates over all keys of `T` and determines which ones cannot be omitted.
 * 
 * @template T - The object type to analyze.
 * @returns The keys of `T` that are required.
 */
export type RequiredKeys<T> = Extract<
    { [K in keyof T]-?: {} extends Pick<T, K> ? never : K; }[keyof T],
    keyof T
>;

/**
 * Extracts the keys of `T` that are optional.
 * This type iterates over all keys of `T` and determines which ones can be omitted.
 * 
 * @template T - The object type to analyze.
 * @returns The keys of `T` that are optional.
 */
export type OptionalKeys<T> = Extract<
    { [K in keyof T]: {} extends Pick<T, K> ? K : never; }[keyof T],
    keyof T
>;

/**
 * Extracts the keys of `T` whose values are not `never`.
 * This type filters out the keys associated with the `never` type, effectively determining
 * which keys of `T` always have a value associated with them.
 * 
 * @template T - The object type to analyze.
 * @returns The keys of `T` whose values are not `never`.
 */
export type AlwaysKeys<T> = Extract<
    { [K in keyof T]: T[K] extends never ? never : K }[keyof T],
    keyof T
>;
