import { expectType } from "@/TypeAssertions";

describe('TypeAssertions', () => {
    it('tests toExtend', () => {
        expectType<1>().toExtend<number>();
        expectType<number>().not.toExtend<1>();

        expectType<{ a: boolean; }>().toExtend<{ a: boolean; }>();
        expectType<{ a: boolean; }>().toExtend<{ a: boolean; b?: string; }>();
        expectType<{ a: boolean; b?: string; }>().toExtend<{ a: boolean; }>();
    });

    it('tests toBe', () => {
        expectType<1>().toBe<1>();
        expectType<1>().not.toBe<2>();

        expectType<{ a: boolean; }>().toBe<{ a: boolean; }>();
        expectType<{ a: boolean; }>().not.toBe<{ a: boolean; b?: string; }>();
        expectType<{ a: boolean; b?: string; }>().not.toBe<{ a: boolean; }>();
    });

    it('tests toHave', () => {
        type A = { a: boolean; };
        type B = { b: string; };
        type C = { c?: number; };

        type AB = A & B;
        type AC = A & C;
        type BC = B & C;
        type ABC = A & B & C;

        expectType<A>().toHave<A>();
        expectType<B>().toHave<B>();
        expectType<C>().toHave<C>();
        expectType<AB>().toHave<AB>();
        expectType<AC>().toHave<AC>();
        expectType<BC>().toHave<BC>();
        expectType<ABC>().toHave<ABC>();

        expectType<A>().not.toHave<BC>();
        expectType<B>().not.toHave<AC>();
        expectType<C>().not.toHave<AB>();
        expectType<AB>().not.toHave<C>();
        expectType<AC>().not.toHave<B>();
        expectType<BC>().not.toHave<A>();
        expectType<ABC>().not.toHave<{}>();

        expectType<AB>().toHave<A>();
        expectType<AB>().toHave<B>();
        expectType<AB>().not.toHave<C>();

        expectType<AC>().toHave<A>();
        expectType<AC>().not.toHave<B>();
        expectType<AC>().toHave<C>();

        expectType<BC>().not.toHave<A>();
        expectType<BC>().toHave<B>();
        expectType<BC>().toHave<C>();

        expectType<ABC>().toHave<A>();
        expectType<ABC>().toHave<B>();
        expectType<ABC>().toHave<C>();
        expectType<ABC>().toHave<AB>();
        expectType<ABC>().toHave<AC>();
        expectType<ABC>().toHave<BC>();
    });

    it('tests toBePartOf', () => {
        type A = { a: boolean; };
        type B = { b: string; };
        type C = { c?: number; };

        type AB = A & B;
        type AC = A & C;
        type BC = B & C;
        type ABC = A & B & C;

        expectType<A>().toBePartOf<A>();
        expectType<B>().toBePartOf<B>();
        expectType<C>().toBePartOf<C>();
        expectType<AB>().toBePartOf<AB>();
        expectType<AC>().toBePartOf<AC>();
        expectType<BC>().toBePartOf<BC>();
        expectType<ABC>().toBePartOf<ABC>();

        expectType<BC>().not.toBePartOf<A>();
        expectType<AC>().not.toBePartOf<B>();
        expectType<AB>().not.toBePartOf<C>();
        expectType<C>().not.toBePartOf<AB>();
        expectType<B>().not.toBePartOf<AC>();
        expectType<A>().not.toBePartOf<BC>();
        expectType<{}>().not.toBePartOf<ABC>();

        expectType<A>().toBePartOf<AB>();
        expectType<B>().toBePartOf<AB>();
        expectType<C>().not.toBePartOf<AB>();

        expectType<A>().toBePartOf<AC>();
        expectType<B>().not.toBePartOf<AC>();
        expectType<C>().toBePartOf<AC>();

        expectType<A>().not.toBePartOf<BC>();
        expectType<B>().toBePartOf<BC>();
        expectType<C>().toBePartOf<BC>();

        expectType<A>().toBePartOf<ABC>();
        expectType<B>().toBePartOf<ABC>();
        expectType<C>().toBePartOf<ABC>();
        expectType<AB>().toBePartOf<ABC>();
        expectType<AC>().toBePartOf<ABC>();
        expectType<BC>().toBePartOf<ABC>();
    });

    it('tests toHaveRequired', () => {
        expectType<{ a: boolean; b?: string; }>().toHaveRequired<['a']>();
        expectType<{ a: boolean; b?: string; }>().not.toHaveRequired<['a', 'b']>();
        expectType<{ a?: boolean; b?: string; }>().not.toHaveRequired<['a', 'b']>();
    });

    it('tests toHaveOptional', () => {
        expectType<{ a: boolean; b?: string; }>().toHaveOptional<['b']>();
        expectType<{ a: boolean; b?: string; }>().not.toHaveOptional<['a', 'b']>();
        expectType<{ a?: boolean; b?: string; }>().toHaveOptional<['a', 'b']>();
    });
});