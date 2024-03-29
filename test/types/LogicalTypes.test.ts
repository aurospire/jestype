import { All, And, Any, Eq, If, Not, Or, Switch, Xor } from "@/types";

describe('Logical Types', () => {
    const expectToBe = <T>(t: T) => { };
    
    it('tests Switch type', () => {
        const switcher = <C extends boolean, O extends boolean>(...invalid: Switch<C, O>) => { };
        
        switcher<true, false>();
        switcher<false, true>();
    });

    it('tests If type', () => {
        expectToBe<If<true, 0, 1>>(0);

        expectToBe<If<false, 0, 1>>(1);

        expectToBe<If<boolean, 0, 1>>(0);
        expectToBe<If<boolean, 0, 1>>(1);
    });

    it('tests All type', () => {
        expectToBe<All<[]>>(false);

        expectToBe<All<[true]>>(true);
        expectToBe<All<[false]>>(false);

        expectToBe<All<[false, false]>>(false);
        expectToBe<All<[false, true]>>(false);
        expectToBe<All<[true, false]>>(false);
        expectToBe<All<[true, true]>>(true);

        expectToBe<All<[false, false, true]>>(false);
        expectToBe<All<[true, true, true]>>(true);
        expectToBe<All<[false, false, false]>>(false);

        expectToBe<All<[boolean]>>(false);
        expectToBe<All<[boolean, true]>>(false);
        expectToBe<All<[boolean, false]>>(false);
    });

    it('tests Any type', () => {
        expectToBe<Any<[]>>(false);

        expectToBe<Any<[true]>>(true);
        expectToBe<Any<[false]>>(false);

        expectToBe<Any<[false, false]>>(false);
        expectToBe<Any<[false, true]>>(true);
        expectToBe<Any<[true, true]>>(true);
        expectToBe<Any<[true, true]>>(true);

        expectToBe<Any<[false, false, true]>>(true);
        expectToBe<Any<[true, true, true]>>(true);
        expectToBe<Any<[false, false, false]>>(false);

        expectToBe<Any<[boolean]>>(true);
        expectToBe<Any<[boolean, true]>>(true);
        expectToBe<Any<[boolean, false]>>(true);
    });

    it('test Not type', () => {
        expectToBe<Not<false>>(true);

        expectToBe<Not<true>>(false);

        expectToBe<Not<boolean>>(true);
        expectToBe<Not<boolean>>(false);
    });

    it('test And type', () => {
        expectToBe<And<false, false>>(false);
        expectToBe<And<false, true>>(false);
        expectToBe<And<true, false>>(false);
        expectToBe<And<true, true>>(true);

        expectToBe<And<boolean, false>>(false);
        expectToBe<And<boolean, true>>(false);
        expectToBe<And<false, boolean>>(false);
        expectToBe<And<true, boolean>>(false);
        expectToBe<And<boolean, boolean>>(false);
    });

    it('test Or type', () => {
        expectToBe<Or<false, false>>(false);
        expectToBe<Or<false, true>>(true);
        expectToBe<Or<true, false>>(true);
        expectToBe<Or<true, true>>(true);

        expectToBe<Or<boolean, false>>(true); true;
        expectToBe<Or<boolean, true>>(true);
        expectToBe<Or<false, boolean>>(true);
        expectToBe<Or<true, boolean>>(true);
        expectToBe<Or<boolean, boolean>>(true);
    });

    it('test Xor type', () => {
        expectToBe<Xor<false, false>>(false);
        expectToBe<Xor<false, true>>(true);
        expectToBe<Xor<true, false>>(true);
        expectToBe<Xor<true, true>>(false);

        expectToBe<Xor<boolean, false>>(true);
        expectToBe<Xor<boolean, false>>(true);
        expectToBe<Xor<boolean, true>>(true);
        expectToBe<Xor<false, boolean>>(true);
        expectToBe<Xor<true, boolean>>(true);
        expectToBe<Xor<boolean, boolean>>(true);
    });

    it('test Eq type', () => {
        expectToBe<Eq<false, false>>(true);
        expectToBe<Eq<false, true>>(false);
        expectToBe<Eq<true, false>>(false);
        expectToBe<Eq<true, true>>(true);

        expectToBe<Eq<boolean, false>>(false);
        expectToBe<Eq<boolean, false>>(false);
        expectToBe<Eq<boolean, true>>(false);
        expectToBe<Eq<false, boolean>>(false);
        expectToBe<Eq<true, boolean>>(false);
        expectToBe<Eq<boolean, boolean>>(false);
    });
});