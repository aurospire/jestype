import { OptionalKeys, RequiredKeys } from "./types/KeyTypes";
import { IsAny, IsEmpty, IsNever, IsUnknown, Primitive, Unit } from "./types/PrimitiveTypes";

/**
 * Creates a branded type representation of `T`.
 * This type function categorizes `T` into specific named types with structured metadata,
 * allowing for detailed introspection and type analysis.
 *
 * @template T - The type to brand.
 * @template Normalized - Indicates if primitive types should be normalized to their object counterparts.
 * @returns The branded type representation of `T`.
 */
export type Brand<T, Normalized extends boolean = false> =
    // any
    IsAny<T> extends true ? { name: 'any', type: 'any'; } :

    // never
    IsNever<T> extends true ? { name: 'never', type: 'never'; } :

    // unknown
    IsUnknown<T> extends true ? { name: 'unknown', type: 'unknown'; } :

    // empty
    IsEmpty<T> extends true ? { name: 'empty', type: '{}'; } :

    // unit
    T extends Unit ? { name: 'unit', type: T; } :

    // primitive
    T extends Primitive ? [Normalized] extends [false] ?
    { name: 'primitive', type: T; } :
    {
        name: 'object',
        type: {
            required: { [K in RequiredKeys<T>]: Brand<T[K]> };
            optional: { [K in OptionalKeys<T>]-?: Brand<T[K]> };
        };
    } :

    // array
    T extends any[] ? { name: 'array', type: { - readonly [K in keyof T]: Brand<T[K]>; }; } :

    // readonly array
    T extends readonly any[] ? { name: 'readonly array', type: { - readonly [K in keyof T]: Brand<T[K]>; }; } :

    // class
    T extends new (...params: infer Params) => infer Class ? {
        name:
        'class',
        type: {
            class: Class;
            params: Brand<Params>;
        };
    } :

    // function
    T extends (...params: infer Params) => infer Returns ?
    {
        name: 'function',
        type: {
            params: Brand<Params>;
            returns: Brand<Returns>;
        };
    } :

    // else
    {
        name: 'object',
        type: {
            // properties: { [K in keyof T]: Brand<T[K]>; };
            required: { [K in RequiredKeys<T>]: Brand<T[K]> };
            optional: { [K in OptionalKeys<T>]-?: Brand<T[K]> };
        };
    };

/**
 * Extracts the brand name of type `T`.
 *
 * @template T - The type to extract the brand name from.
 * @returns The name of the branded type.
 */
export type BrandName<T> = Brand<T>['name'];

/**
 * Extracts the brand type of `T`.
 *
 * @template T - The type to extract the brand type from.
 * @returns The structured type information of the branded type.
 */
export type BrandType<T> = Brand<T>['type'];
