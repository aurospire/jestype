import { BiExtends, Extends } from "@/types";

describe('ExtendsTypes', () => {
    it('tests Extends', () => {
        const expectExtends = <T, S>(value: Extends<T, S>) => { };

        class A { a: number = 0; }
        class B extends A { b: number = 0; }

        expectExtends<number, number>(true);

        expectExtends<any, any>(true);
        expectExtends<any, number>(true);
        expectExtends<number, any>(true);

        expectExtends<never, never>(true);
        expectExtends<never, number>(true);
        expectExtends<number, never>(false);

        expectExtends<number, string>(false);
        expectExtends<string, number>(false);

        expectExtends<A, B>(false);
        expectExtends<B, A>(true);
    });

    it('tests BiExtends', () => {
        const expectBiExtends = <T, S>(value: BiExtends<T, S>) => { };

        class A { a: number = 0; }
        class B extends A { b: number = 0; }

        expectBiExtends<number, number>(true);

        expectBiExtends<any, any>(true);
        expectBiExtends<any, number>(true);
        expectBiExtends<number, any>(true);

        expectBiExtends<never, never>(true);
        expectBiExtends<never, number>(false);
        expectBiExtends<number, never>(false);

        expectBiExtends<number, string>(false);
        expectBiExtends<string, number>(false);

        expectBiExtends<A, B>(false);
        expectBiExtends<B, A>(false);
    });   
});