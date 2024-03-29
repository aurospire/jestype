import { Extends } from "./ExtendsTypes";
import { OptionalKeys } from "./KeyTypes";
import { All, None, Not } from "./LogicalTypes";

const hidden = Symbol('hidden'); type Hidden = typeof hidden;

/**
 * Determines if type `T` is `any`.
 * This type resolves to `true` if `T` is the `any` type, otherwise `false`.
 *
 * @template T - The type to test.
 * @returns `true` if `T` is `any`, otherwise `false`.
 */
export type IsAny<T> = [T] extends [Hidden] ? [Hidden] extends [T] ? true : false : false;

/**
 * Determines if type `T` is `never`.
 * This type resolves to `true` if `T` is the `never` type, otherwise `false`.
 *
 * @template T - The type to test.
 * @returns `true` if `T` is `never`, otherwise `false`.
 */
export type IsNever<T> = [T] extends [never] ? true : false;

/**
 * Determines if type `T` is `unknown`.
 * This type uses logical operations to assess if `T` is exactly `unknown`, 
 * distinct from `any` or other types.
 *
 * @template T - The type to test.
 * @returns `true` if `T` is `unknown`, otherwise `false`.
 */
export type IsUnknown<T> = All<[Extends<unknown, T>, Not<IsAny<T>>]>;

/**
 * Determines if type `T` is an empty type (`{}`).
 * This type evaluates to `true` if `T` is an empty object type and has no optional keys.
 *
 * @template T - The type to test.
 * @returns `true` if `T` is an empty type, otherwise `false`.
 */
export type IsEmpty<T> = All<[Extends<{}, T>, IsNever<OptionalKeys<T>>, None<[IsAny<T>, IsUnknown<T>]>]>;

/**
 * Represents the union of types that are considered unit types in TypeScript (`null`, `undefined`, `void`).
 */
export type Unit = null | undefined | void;

/**
 * Determines if type `T` is a unit type (`null`, `undefined`, or `void`).
 * This type checks if `T` is strictly one of the unit types, excluding `any`, `never`, `unknown`, or empty types.
 *
 * @template T - The type to test.
 * @returns `true` if `T` is a unit type, otherwise `false`.
 */
export type IsUnit<T> = All<[Extends<T, Unit>, None<[IsAny<T>, IsNever<T>, IsUnknown<T>, IsEmpty<T>]>]>;

/**
 * Represents the set of primitive types in TypeScript.
 */
export type Primitive = boolean | string | number | bigint | symbol;

/**
 * Determines if type `T` is a primitive type.
 * This type checks if `T` is one of the primitive types, excluding `any`, `never`, `unknown`, or empty types.
 *
 * @template T - The type to test.
 * @returns `true` if `T` is a primitive type, otherwise `false`.
 */
export type IsPrimitive<T> = All<[Extends<T, Primitive>, None<[IsAny<T>, IsNever<T>, IsUnknown<T>, IsEmpty<T>]>]>;
