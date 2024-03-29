/**
 * Represents a switch type that inverts the given condition if `Inverted` is true.
 * @template Condition - A boolean condition to evaluate.
 * @template Inverted - A boolean flag to invert the condition.
 * @returns An empty tuple if the evaluated condition is true, otherwise a tuple containing `never`.
 */
export type Switch<Condition extends boolean, Inverted extends boolean = false> = 
    [Xor<Condition, Inverted>] extends [true] ? [] : [never];

/**
 * Represents a conditional type that selects one of two possible types based on a condition.
 * @template Condition - The boolean condition to evaluate.
 * @template Then - The type to return if `Condition` is true.
 * @template Else - The type to return if `Condition` is false.
 * @returns `Then` if the condition is true, `Else` if the condition is false, or a union of `Then` and `Else` if indeterminate.
 */
export type If<Condition extends boolean, Then, Else> = 
    [Condition] extends [true] ? Then : [Condition] extends [false] ? Else : Then | Else;

/**
 * Represents a logical NOT operation on a boolean type.
 * @template Value - The boolean value to negate.
 * @returns `true` if `Value` is false, `false` if `Value` is true, or `boolean` if indeterminate.
 */
export type Not<Value extends Boolean> = 
    Value extends false ? true : Value extends true ? false : boolean;

/**
 * Represents a logical AND operation on two boolean types.
 * @template Left - The left-hand operand.
 * @template Right - The right-hand operand.
 * @returns `true` if both operands are true, otherwise `false`.
 */
export type And<Left extends Boolean, Right extends Boolean> = 
    [Left | Right] extends [true] ? true : false;

/**
 * Represents a logical NAND operation on two boolean types.
 * @template Left - The left-hand operand.
 * @template Right - The right-hand operand.
 * @returns The negation of the AND operation on the operands.
 */
export type Nand<Left extends Boolean, Right extends Boolean> = 
    Not<And<Left, Right>>;

/**
 * Represents a logical OR operation on two boolean types.
 * @template Left - The left-hand operand.
 * @template Right - The right-hand operand.
 * @returns `false` if both operands are false, otherwise `true`.
 */
export type Or<Left extends Boolean, Right extends Boolean> = 
    [Left | Right] extends [false] ? false : true;

/**
 * Represents a logical NOR operation on two boolean types.
 * @template Left - The left-hand operand.
 * @template Right - The right-hand operand.
 * @returns The negation of the OR operation on the operands.
 */
export type Nor<Left extends Boolean, Right extends Boolean> = 
    Not<Or<Left, Right>>;

/**
 * Represents a logical XOR (exclusive OR) operation on two boolean types.
 * @template Left - The left-hand operand.
 * @template Right - The right-hand operand.
 * @returns `true` if the operands are different, otherwise `false`.
 */
export type Xor<Left extends Boolean, Right extends Boolean> = 
    [Left | Right] extends [true] ? false : [Left | Right] extends [false] ? false : true;

/**
 * Represents a logical equivalence operation on two boolean types.
 * @template Left - The left-hand operand.
 * @template Right - The right-hand operand.
 * @returns `true` if the operands are the same, otherwise `false`.
 */
export type Eq<Left extends Boolean, Right extends Boolean> = 
    Not<Xor<Left, Right>>;

/**
 * Checks if all elements in a boolean array are true.
 * @template Items - An array of boolean values.
 * @returns `true` if all elements are true, otherwise `false`.
 */
export type All<Items extends Boolean[]> = 
    Items extends [] ? false : [Items[number]] extends [true] ? true : false;

/**
 * Checks if any element in a boolean array is true.
 * @template Items - An array of boolean values.
 * @returns `true` if any element is true, otherwise `false`.
 */
export type Any<Items extends Boolean[]> = 
    Items extends [] ? false : [Items[number]] extends [false] ? false : true;

/**
 * Checks if no elements in a boolean array are true.
 * @template Items - An array of boolean values.
 * @returns `true` if no elements are true, otherwise `false`.
 */
export type None<Items extends Boolean[]> = 
    Not<Any<Items>>;
