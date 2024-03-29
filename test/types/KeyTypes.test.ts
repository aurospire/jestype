import { AlwaysKeys, BiExtends, OptionalKeys, RequiredKeys } from "@/types";

describe('Keys', () => {
    it('tests required', () => {
        const hasKeys = <T, K extends string>(has: BiExtends<RequiredKeys<T>, K>) => { };
        hasKeys<{ a?: 1; }, never>(true);
        hasKeys<{ a?: 1; b: 2; }, 'b'>(true);
        hasKeys<{ a?: 1; b: 2; c: 3; }, 'b' | 'c'>(true);
    });

    it('tests optional', () => {
        const hasKeys = <T, K extends string>(has: BiExtends<OptionalKeys<T>, K>) => { };
        hasKeys<{ a: 1; }, never>(true);
        hasKeys<{ a: 1; b?: 2; }, 'b'>(true);
        hasKeys<{ a: 1; b?: 2; c?: 3; }, 'b' | 'c'>(true);
    });

    it('tests AlwaysKeys', () => {
        const hasKeys = <T, K extends string>(has: BiExtends<AlwaysKeys<T>, K>) => { };
        hasKeys<{ a: never, b: never; }, never>(true);
        hasKeys<{ a: 1, b: never; }, 'a'>(true);
        hasKeys<{ a: 1, b: never; }, 'b'>(false);
    });
});
