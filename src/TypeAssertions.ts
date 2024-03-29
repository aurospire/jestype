import { Brand } from "./Brand";
import { BiExtends, Extends, Not, OptionalKeys, Primitive, RequiredKeys, Switch } from "./types";

/**
 * Provides a suite of type assertion methods to validate type relationships and characteristics,
 * offering fluent API for constructing complex type assertions.
 * 
 * @template T - The type under test.
 * @template Inverted - A boolean flag indicating if the assertions are inverted.
 */
export interface TypeAssertions<T, Inverted extends boolean = false> {
    /**
     * Provides a negated context for the subsequent assertions, toggling the inversion state.
     */
    not: TypeAssertions<T, Not<Inverted>>;

    /**
     * Asserts that type `T` is exactly the  type `S`.
     * @template S - The type to check bidirectional extendability with.
     * @param s - An optional type instance to assert against.
     */
    toBe: {
        <S>(...never: Switch<BiExtends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<BiExtends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
    };

    /**
     * Asserts that type `T` extends a given type `S`.
     * @template S - The type to check against.
     * @param s - An optional type instance to assert against.
     */
    toExtend: {
        <S>(...never: Switch<Extends<T, S>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<Extends<T, S>, Inverted>): TypeAssertions<T, Inverted>;
    };

    /**
    * Asserts that the type `T` is part of the union type `S`.
    * @template S The union type to compare against.
    * @param s - An optional type instance to assert against.
    */
    toBeOfUnion: {
        <S>(...never: Switch<Extends<T, S>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<Extends<T, S>, Inverted>): TypeAssertions<T, Inverted>;
    };

    /**
     * Asserts that type `T` has a property or properties of type `S`.
     * @template S - The type of the property or properties to check for in `T`.
     * @param s - An optional type instance to assert against.
     */
    toHave: {
        <S>(...never: Switch<Extends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<Extends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
    };

    /**
     * Asserts that type `T` is a part of type `S` (i.e., `T` is a subset of `S`).
     * @template S - The superset type to check.
     * @param s - An optional type instance to assert against.
     */
    toBePartOf: {
        <S>(...never: Switch<Extends<Brand<S>, Brand<T>>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<Extends<Brand<S>, Brand<T>>, Inverted>): TypeAssertions<T, Inverted>;
    };

    /**
     * Asserts that type `T` has all the specified required keys.
     * @template K - An array of strings representing the required keys.
     * @param keys - An optional list of required keys to assert against.
     */
    toHaveRequired: {
        <K extends string[]>(...never: Switch<Extends<K[number], RequiredKeys<T>>, Inverted>): TypeAssertions<T, Inverted>;
        <K extends string[]>(keys: K, ...never: Switch<Extends<K[number], RequiredKeys<T>>, Inverted>): TypeAssertions<T, Inverted>;
    };

    /**
     * Asserts that type `T` has all the specified optional keys.
     * @template K - An array of strings representing the optional keys.
     * @param keys - An optional list of optional keys to assert against.
     */
    toHaveOptional: {
        <K extends string[]>(...never: Switch<Extends<K[number], OptionalKeys<T>>, Inverted>): TypeAssertions<T, Inverted>;
        <K extends string[]>(keys: K, ...never: Switch<Extends<K[number], OptionalKeys<T>>, Inverted>): TypeAssertions<T, Inverted>;
    };
}


// Stub implementations for the methods in TypeAssertions.
const assertions: Record<string, any> = {
    toExtend: (...args: any) => assertions,
    toBe: (...args: any) => assertions,
    toHave: (...args: any) => assertions,
    toBePartOf: (...args: any) => assertions,
    toHaveRequired: (...args: any) => assertions,
    toHaveOptional: (...args: any) => assertions,
};

// Set the `not` property to reference the same assertions object, effectively creating a negation layer.
assertions['not'] = assertions;

Object.seal(assertions);

/**
 * Creates an assertion context for the specified type `T`.
 * @template T - The type to create the assertion context for.
 * @template Invert - Flag to indicate if the assertions should be inverted.
 * @param t - The type instance (optional).
 * @returns An instance of `TypeAssertions<T, Invert>` with chainable assertion methods.
 */
export const expectType = <T, Invert extends boolean = false>(t?: T): TypeAssertions<T, Invert> => {
    return assertions as TypeAssertions<T, Invert>;
};
