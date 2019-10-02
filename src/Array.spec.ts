import "Array.ts";

describe("array", () => {
    test("aggregate returns correct aggregated value transformed with a given result selector", () => {
        const array = [{ key: "1", value: 10 }, { key: "2", value: 20 }, { key: "3", value: 30 }, { key: "4", value: 40 }];
        const seed = 1;
        const func = (accumulator: number, element: { value: number }) => accumulator + element.value;
        const resultSelector = (accumulator: number) => accumulator + 3;

        const result = array.aggregate(seed, func, resultSelector);

        expect(result).toBe(104);
    });

    test("all returns true if all array elements satisfy a given condition", () => {
        const array = [4, 5, 6, 7];
        const predicate = (element: number) => element > 3;

        const result = array.all(predicate);

        expect(result).toBeTruthy();
    });

    test("all returns false if any array element doesn't satisfy a given condition", () => {
        const array = [4, 5, 6, 7, 3];
        const predicate = (element: number) => element > 3;

        const result = array.all(predicate);

        expect(result).toBeFalsy();
    });

    test("any returns true if any of array elements satisfies a given condition", () => {
        const array = [1, 2, 3, 4];
        const predicate = (element: number) => element > 3;

        const result = array.any(predicate);

        expect(result).toBeTruthy();
    });

    test("any returns false if none of array elements satisfies a given condition", () => {
        const array = [1, 2, 3];
        const predicate = (element: number) => element > 3;

        const result = array.any(predicate);

        expect(result).toBeFalsy();
    });

    test("append returns a new array with a given element appended", () => {
        const array = [1, 2, 3];

        const result = array.append(4);

        expect(result).toEqual([1, 2, 3, 4]);
        expect(result).not.toBe(array);
    });

    test("average returns average of array elements transformed with a given selector", () => {
        const array = [{ key: "1", value: 10 }, { key: "2", value: 20 }, { key: "3", value: 30 }, { key: "4", value: 40 }];
        const selector = (element: { value: number }) => element.value;

        const result = array.average(selector);

        expect(result).toBe(25);
    });

    test("average returns average of array elements when a selector is not provided and all array elements are of number type", () => {
        const array = [10, 20, 30, 40];

        const result = array.average();

        expect(result).toBe(25);
    });

    test("average throws an error when a selector is not provided and not all array elements are of number type", () => {
        const array = [10, 20, 30, 40, "a"];

        const action = () => array.average();

        expect(action).toThrowError("All array elements must be numbers");
    });

    test("average throws an error when the array is empty", () => {
        const array = [] as Array<number>;

        const action = () => array.average();

        expect(action).toThrowError("Sequence contains no elements");
    });

    test("contains returns true if a given element is present in the array", () => {
        const array = [1, 2, 3, 4];

        const result = array.contains(3);

        expect(result).toBeTruthy();
    });

    test("contains returns false if a given element is present in the array", () => {
        const array = [1, 2, 3, 4];

        const result = array.contains(5);

        expect(result).toBeFalsy();
    });

    test("count returns the array length", () => {
        const array = [1, 2, 3, 4];

        const result = array.count();

        expect(result).toBe(4);
    });

    test("defaultIfEmpty returns array with a given default element when the source array is empty", () => {
        const array = [] as Array<number>;

        const result = array.defultIfEmpty(3);

        expect(result).toEqual([3]);
    });

    test("defaultIfEmpty returns the source array when it's not empty", () => {
        const array = [1, 2];

        const result = array.defultIfEmpty(3);

        expect(result).toBe(array);
    });

    test("distinct returns a new array with distinct values", () => {
        const array = [1, 1, 2, 3, 3, 4, 5, 5];

        const result = array.distinct();

        expect(result).toEqual([1, 2, 3, 4, 5]);
        expect(result).not.toBe(array);
    });

    test("elementAt returns element at a specified index", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.elementAt(3);

        expect(result).toBe(4);
    });

    test("elementAt throws when a specified index is less than 0", () => {
        const array = [1, 2, 3, 4, 5];

        const action = () => array.elementAt(-1);

        expect(action).toThrowError("Index out of range");
    });

    test("elementAt throws when a specified index is greater than the array length", () => {
        const array = [1, 2, 3, 4, 5];

        const action = () => array.elementAt(6);

        expect(action).toThrowError("Index out of range");
    });

    test("elementAt throws when a specified index is equal to the array length", () => {
        const array = [1, 2, 3, 4, 5];

        const action = () => array.elementAt(5);

        expect(action).toThrowError("Index out of range");
    });

    test("elementAtOrUndefined returns element at a specified index", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.elementAtOrUndefined(3);

        expect(result).toBe(4);
    });

    test("elementAtOrUndefined returns undefined when a specified index is less than 0", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.elementAtOrUndefined(-1);

        expect(result).toBe(undefined);
    });

    test("elementAtOrUndefined returns undefined when a specified index is greater than the array length", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.elementAtOrUndefined(6);

        expect(result).toBe(undefined);
    });

    test("elementAtOrUndefined returns undefined when a specified index is equal to the array length", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.elementAtOrUndefined(5);

        expect(result).toBe(undefined);
    });

    test("except returns a new array with those items from the first array that aren't present in the second one", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.except([2, 4]);

        expect(result).toEqual([1, 3, 5]);
        expect(result).not.toBe(array);
    });

    test("first returns first element of the array when the array contains elements and no predicate is provided", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.first();

        expect(result).toBe(1);
    });

    test("first returns first element of the array that satisfied given predicate when such an element exists", () => {
        const array = [1, 2, 3, 4, 5];
        const predicate = (element: number) => element > 3;

        const result = array.first(predicate);

        expect(result).toBe(4);
    });

    test("first throws when the array is empty", () => {
        const array = [] as Array<number>;

        const action = () => array.first();

        expect(action).toThrowError("The source sequence is empty");
    });

    test("first throws when no element satisfy a given predicate", () => {
        const array = [1, 2, 3, 4, 5];
        const predicate = (element: number) => element > 5;

        const action = () => array.first(predicate);

        expect(action).toThrowError("No element satisfies the condition in predicate");
    });

    test("firstOrUndefined returns first element of the array when the array contains elements and no predicate is provided", () => {
        const array = [1, 2, 3, 4, 5];

        const result = array.firstOrUndefined();

        expect(result).toBe(1);
    });

    test("firstOrUndefined returns first element of the array that satisfied given predicate when such an element exists", () => {
        const array = [1, 2, 3, 4, 5];
        const predicate = (element: number) => element > 3;

        const result = array.firstOrUndefined(predicate);

        expect(result).toBe(4);
    });

    test("firstOrUndefined returns undefined when the array is empty", () => {
        const array = [] as Array<number>;

        const result = array.firstOrUndefined();

        expect(result).toBe(undefined);
    });

    test("firstOrUndefined returns undefined when no element satisfy a given predicate", () => {
        const array = [1, 2, 3, 4, 5];
        const predicate = (element: number) => element > 5;

        const result = array.firstOrUndefined(predicate);

        expect(result).toBe(undefined);
    });

    test("groupBy returns map of array elements grouped by a given key selector", () => {
        const element1 = { key: "1", value: 10 };
        const element2 = { key: "2", value: 20 };
        const element3 = { key: "2", value: 30 };
        const element4 = { key: "1", value: 40 };
        const array = [element1, element2, element3, element4];
        const keySelector = (element: { key: string }) => element.key;

        const result = array.groupBy(keySelector);

        expect(result).toEqual(new Map([["1", [element1, element4]], ["2", [element2, element3]]]));
    });

    test("groupJoin returns proper array of result elements from joined arrays", () => {
        const parent1 = { name: "A", value: 10 };
        const parent2 = { name: "B", value: 20 };
        const parent3 = { name: "C", value: 30 };
        const child1 = { name: "W", parent: parent2 };
        const child2 = { name: "X", parent: parent2 };
        const child3 = { name: "Y", parent: parent3 };
        const child4 = { name: "Z", parent: parent1 };
        const outerArray = [parent1, parent2, parent3];
        const innerArray = [child1, child2, child3, child4];
        const outerKeySelector = (element: { name: string; value: number }) => element;
        const innerKeySelector = (element: { name: string; parent: { name: string; value: number } }) => element.parent;
        const resultSelector = (
            outerElement: { name: string; value: number },
            innerElements: Array<{ name: string; parent: { name: string; value: number } }>
        ) => ({ parentName: outerElement.name, childrenNames: innerElements.map(x => x.name) });

        const result = outerArray.groupJoin(innerArray, outerKeySelector, innerKeySelector, resultSelector);

        expect(result).toEqual([
            { parentName: "A", childrenNames: ["Z"] },
            { parentName: "B", childrenNames: ["W", "X"] },
            { parentName: "C", childrenNames: ["Y"] }
        ]);
    });

    test("innerJoin returns proper array of result elements from joined arrays", () => {
        const parent1 = { name: "A", value: 10 };
        const parent2 = { name: "B", value: 20 };
        const parent3 = { name: "C", value: 30 };
        const child1 = { name: "W", parent: parent2 };
        const child2 = { name: "X", parent: parent2 };
        const child3 = { name: "Y", parent: parent3 };
        const child4 = { name: "Z", parent: parent1 };
        const outerArray = [parent1, parent2, parent3];
        const innerArray = [child1, child2, child3, child4];
        const outerKeySelector = (element: { name: string; value: number }) => element;
        const innerKeySelector = (element: { name: string; parent: { name: string; value: number } }) => element.parent;
        const resultSelector = (
            outerElement: { name: string; value: number },
            innerElement: { name: string; parent: { name: string; value: number } }
        ) => ({ parentName: outerElement.name, childName: innerElement.name });

        const result = outerArray.innerJoin(innerArray, outerKeySelector, innerKeySelector, resultSelector);

        expect(result).toEqual([
            { parentName: "A", childName: "Z" },
            { parentName: "B", childName: "W" },
            { parentName: "B", childName: "X" },
            { parentName: "C", childName: "Y" }
        ]);
    });

    test("sum returns sum of array elements transformed with a given selector", () => {
        const array = [{ key: "1", value: 10 }, { key: "2", value: 20 }, { key: "3", value: 30 }, { key: "4", value: 40 }];
        const selector = (element: { value: number }) => element.value;

        const result = array.sum(selector);

        expect(result).toBe(100);
    });

    test("sum returns sum of array elements when a selector is not provided and all array elements are of number type", () => {
        const array = [10, 20, 30, 40];

        const result = array.sum();

        expect(result).toBe(100);
    });

    test("sum throws an error when a selector is not provided and not all array elements are of number type", () => {
        const array = [10, 20, 30, 40, "a"];

        const action = () => array.sum();

        expect(action).toThrowError("All array elements must be numbers");
    });

    test("sum throws an error when the array is empty", () => {
        const array = [] as Array<number>;

        const action = () => array.sum();

        expect(action).toThrowError("Sequence contains no elements");
    });

    test("where returns a new array with elements that satisfy a given condition", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const predicate = (element: number) => element > 3;

        const result = array.where(predicate);

        expect(result).toEqual([4, 5, 6, 7, 8, 9, 10]);
        expect(result).not.toBe(array);
    });
});
