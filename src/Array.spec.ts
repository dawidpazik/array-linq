import "Array.ts";

describe("where", () => {
    test("returns an array with elements that satisfy the given condition", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const predicate = (item: number) => item % 3 == 0;

        const result = array.where(predicate);

        expect(result).toEqual([3, 6, 9]);
    });
});
