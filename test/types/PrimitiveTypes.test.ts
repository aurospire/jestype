import { IsAny, IsEmpty, IsNever, IsPrimitive, IsUnit, IsUnknown, Primitive, Unit } from "@/types";

describe('Special Types', () => {
    const expectToBe = <T>(t: T) => { };

    it('test IsAny type', () => {
        expectToBe<IsAny<any>>(true);
        expectToBe<IsAny<never>>(false);
        expectToBe<IsAny<unknown>>(false);
        expectToBe<IsAny<{}>>(false);
        expectToBe<IsAny<Unit>>(false);
        expectToBe<IsAny<Primitive>>(false);
    });

    it('test IsNever type', () => {
        expectToBe<IsNever<any>>(false);
        expectToBe<IsNever<never>>(true);
        expectToBe<IsNever<unknown>>(false);
        expectToBe<IsNever<{}>>(false);
        expectToBe<IsNever<Unit>>(false);
        expectToBe<IsNever<Primitive>>(false);
    });

    it('test IsUnknown type', () => {
        expectToBe<IsUnknown<any>>(false);
        expectToBe<IsUnknown<never>>(false);
        expectToBe<IsUnknown<unknown>>(true);
        expectToBe<IsUnknown<{}>>(false);
        expectToBe<IsUnknown<Unit>>(false);
        expectToBe<IsUnknown<Primitive>>(false);
    });

    it('test IsEmpty type', () => {
        expectToBe<IsEmpty<any>>(false);
        expectToBe<IsEmpty<never>>(false);
        expectToBe<IsEmpty<unknown>>(false);
        expectToBe<IsEmpty<{}>>(true);
        expectToBe<IsEmpty<Unit>>(false);
        expectToBe<IsEmpty<Primitive>>(false);
    });

    it('test IsUnit type', () => {
        expectToBe<IsUnit<any>>(false);
        expectToBe<IsUnit<never>>(false);
        expectToBe<IsUnit<unknown>>(false);
        expectToBe<IsUnit<{}>>(false);
        expectToBe<IsUnit<Unit>>(true);
        expectToBe<IsUnit<Primitive>>(false);
    });

    it('test IsPrimitive type', () => {
        expectToBe<IsPrimitive<any>>(false);
        expectToBe<IsPrimitive<never>>(false);
        expectToBe<IsPrimitive<unknown>>(false);
        expectToBe<IsPrimitive<{}>>(false);
        expectToBe<IsPrimitive<Unit>>(false);
        expectToBe<IsPrimitive<Primitive>>(true);
    });
});