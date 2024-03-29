import { BiExtends, Brand, BrandName, BrandType, Primitive } from "@";

describe('Brand', () => {
    it('tests the name', () => {
        type MatchesName<T, S> = BiExtends<BrandName<T>, S>;

        const expectName = <T, S>(value: MatchesName<T, S>) => { };

        expectName<never, 'never'>(true);
        expectName<any, 'any'>(true);
        expectName<unknown, 'unknown'>(true);
        expectName<{}, 'empty'>(true);
        expectName<Primitive, 'primitive'>(true);
        expectName<boolean, 'primitive'>(true);
        expectName<true, 'primitive'>(true);
        expectName<[], 'array'>(true);
        expectName<readonly [], 'readonly array'>(true);
        expectName<typeof Date, 'class'>(true);
        expectName<() => void, 'function'>(true);
        expectName<{ a: boolean; b?: number; }, 'object'>(true);
    });

    it('tests the type', () => {
        type MatchesType<T, S> = BiExtends<BrandType<T>, S>;

        const expectType = <T, S>(value: MatchesType<T, S>) => { };

        type a = BrandType<never>;
        type b = BrandType<never>;
        type c = BiExtends<a, b>;
        expectType<never, 'never'>(true);

        expectType<any, 'any'>(true);

        expectType<unknown, 'unknown'>(true);

        expectType<{}, '{}'>(true);

        expectType<Primitive, Primitive>(true);
        expectType<number, Primitive>(false);

        expectType<[], []>(true);
        expectType<[1, 2, 3], [Brand<1>, Brand<2>, Brand<3>]>(true);

        expectType<readonly [], []>(true);
        expectType<readonly [1, 2, 3], [Brand<1>, Brand<2>, Brand<3>]>(true);

        expectType<typeof Date, {
            class: Date,
            params: Brand<[number | string | Date]>;
        }>(true);

        expectType<() => void, { params: Brand<[]>, returns: Brand<void>; }>(true);
        expectType<(a: Primitive, ...b: any[]) => void, {
            params: Brand<[a: Primitive, ...b: any[]]>,
            returns: Brand<void>;
        }>(true);

        expectType<{ a: boolean; b?: number; }, {
            required: {
                a: Brand<boolean>,
            };
            optional: {
                b: Brand<number | undefined>;
            },
        }>(true);
    });

    it('tests Brand->BiExtends', () => {
        const expectMatches = <T, S>(value: BiExtends<Brand<T>, Brand<S>>) => { };

        expectMatches<any, any>(true);
        expectMatches<any, never>(false);
        expectMatches<any, unknown>(false);
        expectMatches<any, {}>(false);
        expectMatches<any, Primitive>(false);
        expectMatches<any, () => {}>(false);
        expectMatches<any, Date>(false);

        expectMatches<any, any>(true);
        expectMatches<never, any>(false);
        expectMatches<unknown, any>(false);
        expectMatches<{}, any>(false);
        expectMatches<Primitive, any>(false);
        expectMatches<() => {}, any>(false);
        expectMatches<Date, any>(false);

        class A { a: number = 0; }
        class S extends A { }
        class D extends A { b: number = 1; }

        expectMatches<A, S>(true);
        expectMatches<A, any>(false);
        expectMatches<S, A>(true);
        expectMatches<A, D>(false);
        expectMatches<D, A>(false);

        expectMatches<[any, number], [number, any]>(false);
        expectMatches<{ x: any; }, { x: 1; }>(false);

        class Foo<T> { constructor(public foo: T) { } }
        expectMatches<Foo<number>, Foo<any>>(false);

        const expectMatchesNormalized = <T, S>(value: BiExtends<Brand<T, true>, Brand<S, true>>) => { };

        expectMatchesNormalized<number & { _tag: 'dollar'; }, number & { _tag: any; }>(false);
    });
});