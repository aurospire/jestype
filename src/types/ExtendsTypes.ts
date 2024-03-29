/**
 * Determines if type `T` extends type `S`.
 * This type evaluates to `true` if `T` is a subtype of `S`, otherwise `false`.
 * It's a conditional type that checks the extendability or subtype relationship between `T` and `S`.
 *
 * @template T - The type to test if it extends `S`.
 * @template S - The base type to compare against.
 * @returns `true` if `T` extends `S`, otherwise `false`.
 */
export type Extends<T, S> = [T] extends [S] ? true : false;

/**
 * Determines if type `T` and type `S` are mutually extendable (bi-directional extends).
 * This type evaluates to `true` if `T` extends `S` and `S` extends `T`, indicating a type equivalence
 * or a very close relationship between `T` and `S`.
 *
 * @template T - The first type to test for mutual extendability with `S`.
 * @template S - The second type to test for mutual extendability with `T`.
 * @returns `true` if both `T` extends `S` and `S` extends `T`, otherwise `false`.
 */
export type BiExtends<T, S> = [T] extends [S] ? [S] extends [T] ? true : false : false;
