# Jestype - TypeScript Type Tester for Jest

Jestype is a TypeScript utility designed to facilitate type testing within Jest, providing developers with tools to assert and validate type behaviors in TypeScript projects. At its core, `expectType` serves as the type-level counterpart to Jest's `expect` function, enabling type assertions in a manner analogous to value-based testing.

## Getting Started

Install Jestype in your development environment with npm:

```bash
npm install jestype --save-dev
```

Then, import and use `expectType` in your Jest tests to validate types.

## `expectType`
`expectType` is the primary function of Jestype and acts as the type-level equivalent of Jest's `expect`. 

It allows type assertions for a specific type `T`, providing a fluent API for asserting type properties and relationships.

### Usage

```typescript
import { expectType } from 'jestype';

// Assert that a type is exactly another type
expectType<string>().toBe<string>();

// Assert that a type extends another type
expectType<string>().toExtend<string | number>();

// Negation example
expectType<string>().not.toBe<number>();
```

### Methods

- `.toBe<S>()`: Asserts that the tested type `T` is exactly the same as type `S`.

- `.toExtend<S>()`: Asserts that the tested type `T` extends type `S`.

- `.toBeOfUnion<S>()`: Asserts that the tested type `T` is part of the union `S`

- `.toHave<S>()`: Asserts that the tested type `T` has the same properties as type `S`.

- `.toBePartOf<S>()`: Asserts that the tested type `T` is a subset of type `S`.

- `.toHaveRequired<K extends string[]>()`: Asserts that the tested type `T` has all the required keys specified in `K`.

- `.toHaveOptional<K extends string[]>()`: Asserts that the tested type `T` has all the optional keys specified in `K`.

- `.not`: Inverts the subsequent type assertion, allowing for negated checks.

### Examples

#### `.toBe<S>`

Asserts that the tested type `T` is exactly the same as type `S`.

```typescript
// Should pass: string is exactly a string
expectType<string>().toBe<string>();

// Should fail: string is not a number
expectType<string>().toBe<number>();

```
---

#### `.toExtend<S>`
Asserts that the tested type `T` extends type `S`.

```typescript
/* Using Interfaces*/
interface Base {
    baseProp: string;
}

interface Extended extends Base {
    extendedProp: number;
}

// Should pass: Extended extends Base
expectType<Extended>().toExtend<Base>();

// Should fail: Base does not extend Extended
expectType<Base>().toExtend<Extended>();


/* Using Unions */

// Should pass: string is assignable to string | number 
expectType<string>().toExtend<string | number>();

// Should fail: string | number is not assignable to string 
expectType<string | number>().toExtend<string>();
```
---

#### `.toBeOfUnion<S>`
Asserts that the tested type `T` is part of the union `S`

Exactly the same as `toExtend`, but lends to a more intuitive sounding type assertion for unions

```typescript
// Should pass: `string` is part of union `string | number`
expectType<string>().toBeOfUnion<string | number>();

// Should fail: `string` is not in union `string | number`
expectType<string | number>().toBeOfUnion<string>();
```
---

#### `.toHave<S>`
Asserts that the tested type `T` has the same properties as type `S`.

```typescript
interface Person {
    name: string;
    age: number;
}

// Should pass: Person has name and age properties
expectType<Person>().toHave<{ name: string; age: number; }>();

// Should fail: Person does not have a salary property
expectType<Person>().toHave<{ salary: number; }>();
```
---

#### `.toBePartOf<S>`
Asserts that the tested type `T` is a subset of type `S`.

```typescript
interface Vehicle {
    make: string;
    model: string;
    year: number;
}

interface Car {
    make: string;
    model: string;
}

// Should pass: Car is part of Vehicle
expectType<Car>().toBePartOf<Vehicle>();

// Should fail: Vehicle is not a subset of Car
expectType<Vehicle>().toBePartOf<Car>();
```
---

#### `.toHaveRequired`
Asserts that the tested type `T` has all the required keys specified in `K`.

```typescript
interface User {
    id: number;
    name: string;
    email?: string;
}

// Should pass: User has required keys id and name
expectType<User>().toHaveRequired<['id', 'name']>();

// Should fail: User does not have a required key 'password'
expectType<User>().toHaveRequired<['password']>();
```
---

#### `.toHaveOptional<S>`
Asserts that the tested type `T` has all the optional keys specified in `K`.

```typescript
interface Product {
    id: number;
    name: string;
    description?: string;
    price?: number;
}

// Should pass: Product has optional key 'description'
expectType<Product>().toHaveOptional<['description']>();

// Should fail: Product does not have an optional key 'weight'
expectType<Product>().toHaveOptional<['weight']>();
```
---

#### `.not`
Inverts the subsequent type assertion, allowing for negated checks.

```typescript
// Should pass: string is not a number
expectType<string>().not.toBe<number>();

// Should fail: string is not a number
expectType<string>().<number>();
```

## Type Utilities
Jestype also includes Utility Types that expectType is built on:

### Logical Types
- `And<T, U>`: Logical AND of `T` and `U`.

- `Or<T, U>`: Logical OR of `T` and `U`.

- `Not<T>`: Logical NOT of `T`.

- `Nand<T, U>`: Logical NAND of `T` and `U`.

- `Nor<T, U>`: Logical NOR of `T` and `U`.

- `Xor<T, U>`: Logical XOR of `T` and `U`.

- `Eq<T, U>`: Checks if `T` and `U` are equivalent.


- `All<Items>`: True if all `Items` are true.

- `Any<Items>`: True if any of `Items` are true.

- `None<Items>`: True if none of `Items` are true.


- `Switch<Condition, Inverted>`: Evaluates `Condition` and inverts the result if `Inverted` is `true`.

- `If<Condition, Then, Else>`: Returns `Then` if `Condition` is `true`, otherwise `Else`.

### ExtendsTypes
- `Extends<T, S>`: Determines if type `T` extends type `S`.

- `BiExtends<T, S>`: Determines if types `T` and `S` are mutually extendable (bi-directional extends).

### Key Types
- `RequiredKeys<T>`: Extracts the required keys of type `T`.

- `OptionalKeys<T>`: Extracts the optional keys of type `T`.

- `AlwaysKeys<T>`: Extracts keys of `T` that are always present.


### Primitive Types
- `IsAny<T>`: Determines if type `T` is `any`.

- `IsNever<T>`: Determines if type `T` is `never`.

- `IsUnknown<T>`: Determines if type `T` is `unknown`.

- `IsEmpty<T>`: Determines if type `T` is an empty object (`{}`).

- `IsPrimitive<T>`: Determines if type `T` is a primitive type.

### Branding

- `Brand<T>`: Creates a branded representation of type `T`, useful for complex type analysis.
