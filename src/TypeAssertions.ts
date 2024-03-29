import { Brand } from "./Brand";
import { BiExtends, Extends, Not, OptionalKeys, Primitive, RequiredKeys, Switch } from "./types";

/**
 * Defines type assertion methods to validate type relationships and characteristics.
 * @template T - The type to be tested.
 * @template Inverted - Boolean flag to invert the assertion logic (not operation).
 */
export interface TypeAssertions<T, Inverted extends boolean = false> {
    not: TypeAssertions<T, Not<Inverted>>;

    toExtend: {
        <S>(...never: Switch<Extends<T, S>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<Extends<T, S>, Inverted>): TypeAssertions<T, Inverted>;
    };

    toBe: {
        <S>(...never: Switch<BiExtends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<BiExtends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
    };

    toHave: {
        <S>(...never: Switch<Extends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<Extends<Brand<T>, Brand<S>>, Inverted>): TypeAssertions<T, Inverted>;
    };

    toBePartOf: {
        <S>(...never: Switch<Extends<Brand<S>, Brand<T>>, Inverted>): TypeAssertions<T, Inverted>;
        <S>(s: S, ...never: Switch<Extends<Brand<S>, Brand<T>>, Inverted>): TypeAssertions<T, Inverted>;
    };

    toHaveRequired: {
        <K extends string[]>(...never: Switch<Extends<K[number], RequiredKeys<T>>, Inverted>): TypeAssertions<T, Inverted>;
        <K extends string[]>(keys: K, ...never: Switch<Extends<K[number], RequiredKeys<T>>, Inverted>): TypeAssertions<T, Inverted>;
    };

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
