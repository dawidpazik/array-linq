# array-linq

## LINQ-like methods for TypeScript arrays

![Dependencies](https://img.shields.io/badge/dependencies-0-blue) ![NPM](https://img.shields.io/npm/l/array-linq?color=blue)

### Test Coverage ###

| Statements                                    | Branches                                  | Functions                                   | Lines                               | Build Status                                    |
| --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- | ----------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg "Make me better!") | ![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg "Building Status") |

### Usage ###

```sh
npm install array-linq
```

```ts
import "array-linq"
```

```ts
array
    .where(item => item.value < 10)
    .selectMany(item => item.children, (i, c) => ({ item: i, child: c }))
    .select(x => x.item.value * 10 + x.child.value)
    .average();
```

### Available methods ###

```ts
    aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (accumulator: TAccumulate, element: T) => TAccumulate,
        resultSelector: (accumulator: TAccumulate) => TResult
    ): TResult;
```
```ts
    all(predicate: (element: T) => boolean): boolean;
```
```ts
    any(predicate: (element: T) => boolean): boolean;
```
```ts
    append(element: T): T[];
```
```ts
    average(): number;
```
```ts
    average(selector: (element: T) => number): number;
```
```ts
    contains(elment: T): boolean;
```
```ts
    count(): number;
```
```ts
    defultIfEmpty(defaultValue: T): T[];
```
```ts
    distinct(): T[];
```
```ts
    elementAt(index: number): T;
```
```ts
    elementAtOrUndefined(index: number): T | undefined;
```
```ts
    except(second: T[]): T[];
```
```ts
    first(): T;
```
```ts
    first(prdicate: (element: T) => boolean): T;
```
```ts
    firstOrUndefined(): T | undefined;
```
```ts
    firstOrUndefined(prdicate: (element: T) => boolean): T | undefined;
```
```ts
    groupBy<TKey>(keySelector: (element: T) => TKey): Map<TKey, T[]>;
```
```ts
    groupJoin<TInner, TKey, TResult>(
        inner: TInner[],
        outerKeySelector: (element: T) => TKey,
        innerKeySelector: (innerElement: TInner) => TKey,
        resultSelector: (element: T, innerElements: TInner[]) => TResult
    ): TResult[];
```
```ts
    innerJoin<TInner, TKey, TResult>(
        inner: TInner[],
        outerKeySelector: (element: T) => TKey,
        innerKeySelector: (innerElement: TInner) => TKey,
        resultSelector: (element: T, innerElement: TInner) => TResult
    ): TResult[];
```
```ts
    intersect(second: T[]): T[];
```
```ts
    last(): T;
```
```ts
    last(prdicate: (element: T) => boolean): T;
```
```ts
    lastOrUndefined(): T | undefined;
```
```ts
    lastOrUndefined(prdicate: (element: T) => boolean): T | undefined;
```
```ts
    max(): number;
```
```ts
    max(selector: (element: T) => number): number;
```
```ts
    min(): number;
```
```ts
    min(selector: (element: T) => number): number;
```
```ts
    orderBy<TKey>(keySelector: (element: T) => TKey): T[];
```
```ts
    orderByDescending<TKey>(keySelector: (element: T) => TKey): T[];
```
```ts
    prepend(element: T): T[];
```
```ts
    reverseImmutable(): T[];
```
```ts
    select<TResult>(selector: (element: T, index: number) => TResult): TResult[];
```
```ts
    selectMany<TCollection, TResult>(
        collectionSelector: (element: T, index: number) => TCollection[],
        resultSelector: (element: T, child: TCollection) => TResult
    ): TResult[];
```
```ts
    sequenceEqual(second: T[]): boolean;
```
```ts
    single(): T;
```
```ts
    single(prdicate: (element: T) => boolean): T;
```
```ts
    singleOrUndefined(): T | undefined;
```
```ts
    singleOrUndefined(prdicate: (element: T) => boolean): T | undefined;
```
```ts
    skip(count: number): T[];
```
```ts
    skipLast(count: number): T[];
```
```ts
    skipWhile(predicate: (element: T) => boolean): T[];
```
```ts
    take(count: number): T[];
```
```ts
    takeLast(count: number): T[];
```
```ts
    takeWhile(predicate: (element: T) => boolean): T[];
```
```ts
    sum(): number;
```
```ts
    sum(selector: (element: T) => number): number;
```
```ts
    toDictionary<TKey, TElement>(
        keySelector: (element: T) => TKey,
        elementSelector: (element: T) => TElement
    ): Map<TKey, TElement>;
```
```ts
    toHashSet(): Set<T>;
```
```ts
    union(second: T[]): T[];
```
```ts
    where(predicate: (element: T) => boolean): T[];
```
```ts
    zip<TSecond, TResult>(
        second: TSecond[],
        resultSelector: (firstElement: T, secondElement: TSecond) => TResult
    ): TResult[];
```
