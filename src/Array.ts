interface Array<T> {
    aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (accumulator: TAccumulate, element: T) => TAccumulate,
        resultSelector: (accumulator: TAccumulate) => TResult
    ): TResult;
    all(predicate: (element: T) => boolean): boolean;
    any(predicate: (element: T) => boolean): boolean;
    append(element: T): T[];
    average(): number;
    average(selector: (element: T) => number): number;
    contains(elment: T): boolean;
    count(): number;
    defultIfEmpty(defaultValue: T): T[];
    distinct(): T[];
    elementAt(index: number): T;
    elementAtOrUndefined(index: number): T | undefined;
    except(second: T[]): T[];
    first(): T;
    first(prdicate: (element: T) => boolean): T;
    firstOrUndefined(): T | undefined;
    firstOrUndefined(prdicate: (element: T) => boolean): T | undefined;
    groupBy<TKey>(keySelector: (element: T) => TKey): Map<TKey, T[]>;
    groupJoin<TInner, TKey, TResult>(
        inner: TInner[],
        outerKeySelector: (element: T) => TKey,
        innerKeySelector: (innerElement: TInner) => TKey,
        resultSelector: (element: T, innerElements: TInner[]) => TResult
    ): TResult[];
    innerJoin<TInner, TKey, TResult>(
        inner: TInner[],
        outerKeySelector: (element: T) => TKey,
        innerKeySelector: (innerElement: TInner) => TKey,
        resultSelector: (element: T, innerElement: TInner) => TResult
    ): TResult[];
    intersect(second: T[]): T[];
    last(): T;
    last(prdicate: (element: T) => boolean): T;
    lastOrUndefined(): T | undefined;
    lastOrUndefined(prdicate: (element: T) => boolean): T | undefined;
    max(): number;
    max(selector: (element: T) => number): number;
    min(): number;
    min(selector: (element: T) => number): number;
    orderBy<TKey>(keySelector: (element: T) => TKey): T[];
    orderByDescending<TKey>(keySelector: (element: T) => TKey): T[];
    prepend(element: T): T[];
    reverseImmutable(): T[];
    select<TResult>(selector: (element: T, index: number) => TResult): TResult[];
    selectMany<TCollection, TResult>(
        collectionSelector: (element: T, index: number) => TCollection[],
        resultSelector: (element: T, child: TCollection) => TResult
    ): TResult[];
    sequenceEqual(second: T[]): boolean;
    single(): T;
    single(prdicate: (element: T) => boolean): T;
    singleOrUndefined(): T | undefined;
    singleOrUndefined(prdicate: (element: T) => boolean): T | undefined;
    skip(count: number): T[];
    skipLast(count: number): T[];
    skipWhile(predicate: (element: T) => boolean): T[];
    take(count: number): T[];
    takeLast(count: number): T[];
    takeWhile(predicate: (element: T) => boolean): T[];
    sum(): number;
    sum(selector: (element: T) => number): number;
    toDictionary<TKey, TElement>(
        keySelector: (element: T) => TKey,
        elementSelector: (element: T) => TElement
    ): Map<TKey, TElement>;
    toHashSet(): Set<T>;
    union(second: T[]): T[];
    where(predicate: (element: T) => boolean): T[];
    zip<TSecond, TResult>(
        second: TSecond[],
        resultSelector: (firstElement: T, secondElement: TSecond) => TResult
    ): TResult[];
}

Array.prototype.aggregate = function <T, TAccumulate, TResult>(
    this: T[],
    seed: TAccumulate,
    func: (accumulator: TAccumulate, element: T) => TAccumulate,
    resultSelector: (accumulator: TAccumulate) => TResult
): TResult {
    return resultSelector(this.reduce((accumulator: TAccumulate, element: T) => func(accumulator, element), seed));
};

Array.prototype.all = function <T>(this: T[], predicate: (element: T) => boolean): boolean {
    return this.every((element) => predicate(element));
};

Array.prototype.any = function <T>(this: T[], predicate: (element: T) => boolean): boolean {
    return this.some(predicate);
};

Array.prototype.append = function <T>(this: T[], element: T): T[] {
    return [...this, element];
};

Array.prototype.average = function <T>(this: T[], selector?: (element: T) => number): number {
    if (this.length < 1) {
        throw new Error("Sequence contains no elements");
    }

    return (selector !== undefined ? this.sum(selector) : this.sum()) / this.length;
};

Array.prototype.contains = function <T>(this: T[], element: T): boolean {
    return this.includes(element);
};

Array.prototype.count = function <T>(this: T[]): number {
    return this.length;
};

Array.prototype.defultIfEmpty = function <T>(this: T[], defaultValue: T): T[] {
    return this.length > 0 ? this : [defaultValue];
};

Array.prototype.distinct = function <T>(this: T[]): T[] {
    return [...new Set(this)];
};

Array.prototype.elementAt = function <T>(this: T[], index: number): T {
    if (index < 0 || index >= this.length) {
        throw new Error("Index out of range");
    }

    return this[index];
};

Array.prototype.elementAtOrUndefined = function <T>(this: T[], index: number): T | undefined {
    if (index < 0 || index >= this.length) {
        return undefined;
    }

    return this[index];
};

Array.prototype.except = function <T>(this: T[], second: T[]): T[] {
    return this.filter((element) => !second.includes(element));
};

Array.prototype.first = function <T>(this: T[], predicate?: (element: T) => boolean): T {
    if (this.length < 1) {
        throw Error("The source sequence is empty");
    }
    if (predicate === undefined) {
        return this[0];
    }

    for (const element of this) {
        if (predicate(element)) {
            return element;
        }
    }

    throw Error("No element satisfies the condition in predicate");
};

Array.prototype.firstOrUndefined = function <T>(this: T[], predicate?: (element: T) => boolean): T | undefined {
    if (this.length < 1) {
        return undefined;
    }
    if (predicate === undefined) {
        return this[0];
    }

    for (const element of this) {
        if (predicate(element)) {
            return element;
        }
    }

    return undefined;
};

Array.prototype.groupBy = function <T, TKey>(keySelector: (element: T) => TKey): Map<TKey, T[]> {
    return this.reduce((accumulator: Map<TKey, T[]>, element: T) => {
        const key = keySelector(element);
        const group = accumulator.get(key);
        if (group === undefined) {
            accumulator.set(key, [element]);
        } else {
            group.push(element);
        }
        return accumulator;
    }, new Map<TKey, T[]>());
};

Array.prototype.groupJoin = function <T, TInner, TKey, TResult>(
    this: T[],
    inner: TInner[],
    outerKeySelector: (element: T) => TKey,
    innerKeySelector: (innerElement: TInner) => TKey,
    resultSelector: (element: T, innerElements: TInner[]) => TResult
): TResult[] {
    const result = [] as TResult[];

    this.forEach((element: T) => {
        const matchingInnerElements = [] as TInner[];
        inner.forEach((innerElement: TInner) => {
            if (outerKeySelector(element) === innerKeySelector(innerElement)) {
                matchingInnerElements.push(innerElement);
            }
        });
        result.push(resultSelector(element, matchingInnerElements));
    });

    return result;
};

Array.prototype.innerJoin = function <T, TInner, TKey, TResult>(
    this: T[],
    inner: TInner[],
    outerKeySelector: (element: T) => TKey,
    innerKeySelector: (innerElement: TInner) => TKey,
    resultSelector: (element: T, innerElement: TInner) => TResult
): TResult[] {
    const result = [] as TResult[];

    this.forEach((element: T) => {
        inner.forEach((innerElement: TInner) => {
            if (outerKeySelector(element) === innerKeySelector(innerElement)) {
                result.push(resultSelector(element, innerElement));
            }
        });
    });

    return result;
};

Array.prototype.intersect = function <T>(this: T[], second: T[]) {
    return this.filter((element: T) => second.includes(element));
};

Array.prototype.last = function <T>(this: T[], predicate?: (element: T) => boolean): T {
    if (this.length < 1) {
        throw Error("The source sequence is empty");
    }
    if (predicate === undefined) {
        return this[this.length - 1];
    }

    for (let i = this.length - 1; i >= 0; --i) {
        if (predicate(this[i])) {
            return this[i];
        }
    }

    throw Error("No element satisfies the condition in predicate");
};

Array.prototype.lastOrUndefined = function <T>(this: T[], predicate?: (element: T) => boolean): T | undefined {
    if (this.length < 1) {
        return undefined;
    }
    if (predicate === undefined) {
        return this[this.length - 1];
    }

    for (let i = this.length - 1; i >= 0; --i) {
        if (predicate(this[i])) {
            return this[i];
        }
    }

    return undefined;
};

Array.prototype.max = function <T>(this: T[], selector?: (element: T) => number): number {
    if (this.length < 1) {
        throw new Error("Sequence contains no elements");
    }

    return selector !== undefined
        ? this.reduce((accumulator: number, element: T) => Math.max(selector(element), accumulator), Number.MIN_VALUE)
        : this.reduce((accumulator: number, element: T) => {
              if (typeof element === "number") {
                  return Math.max(element, accumulator);
              } else {
                  throw Error("All array elements must be numbers");
              }
          }, Number.MIN_VALUE);
};

Array.prototype.min = function <T>(this: T[], selector?: (element: T) => number): number {
    if (this.length < 1) {
        throw new Error("Sequence contains no elements");
    }

    return selector !== undefined
        ? this.reduce((accumulator: number, element: T) => Math.min(selector(element), accumulator), Number.MAX_VALUE)
        : this.reduce((accumulator: number, element: T) => {
              if (typeof element === "number") {
                  return Math.min(element, accumulator);
              } else {
                  throw Error("All array elements must be numbers");
              }
          }, Number.MAX_VALUE);
};

Array.prototype.orderBy = function <T, TKey>(this: T[], keySelector: (element: T) => TKey): T[] {
    return [...this].sort((a: T, b: T) =>
        keySelector(a) < keySelector(b) ? -1 : keySelector(a) > keySelector(b) ? 1 : 0
    );
};

Array.prototype.orderByDescending = function <T, TKey>(this: T[], keySelector: (element: T) => TKey): T[] {
    return [...this].sort((a: T, b: T) =>
        keySelector(a) < keySelector(b) ? 1 : keySelector(a) > keySelector(b) ? -1 : 0
    );
};

Array.prototype.prepend = function <T>(this: T[], element: T): T[] {
    return [element, ...this];
};

Array.prototype.reverseImmutable = function <T>(this: T[]): T[] {
    return [...this].reverse();
};

Array.prototype.select = function <T, TResult>(this: T[], selector: (element: T, index: number) => TResult): TResult[] {
    return this.map((value: T, index: number) => selector(value, index));
};

Array.prototype.selectMany = function <T, TCollection, TResult>(
    this: T[],
    collectionSelector: (element: T, index: number) => TCollection[],
    resultSelector: (element: T, child: TCollection) => TResult
): TResult[] {
    return this.reduce(
        (accumulator: TResult[], currentValue: T, currentIndex: number) => [
            ...accumulator,
            ...collectionSelector(currentValue, currentIndex).map((value: TCollection) =>
                resultSelector(currentValue, value)
            ),
        ],
        []
    );
};

Array.prototype.sequenceEqual = function <T>(second: T[]): boolean {
    if (this === second) {
        return true;
    }
    if (this.length !== second.length) {
        return false;
    }

    for (let i = 0; i < this.length; ++i) {
        if (this[i] !== second[i]) {
            return false;
        }
    }

    return true;
};

Array.prototype.single = function <T>(this: T[], predicate?: (element: T) => boolean): T {
    if (this.length < 1) {
        throw Error("The source sequence is empty");
    }
    if (predicate === undefined) {
        if (this.length > 1) {
            throw Error("The input sequence contains more than one element");
        }
        return this[0];
    }

    const matchingElements = this.filter(predicate);

    switch (matchingElements.length) {
        case 1:
            return matchingElements[0];
        case 0:
            throw Error("No element satisfies the condition in predicate");
        default:
            throw Error("More than one element satisfies the condition in predicate");
    }
};

Array.prototype.singleOrUndefined = function <T>(this: T[], predicate?: (element: T) => boolean): T | undefined {
    if (this.length < 1) {
        return undefined;
    }
    if (predicate === undefined) {
        if (this.length > 1) {
            throw Error("The input sequence contains more than one element");
        }
        return this[0];
    }

    const matchingElements = this.filter(predicate);

    switch (matchingElements.length) {
        case 1:
            return matchingElements[0];
        case 0:
            return undefined;
        default:
            throw Error("More than one element satisfies the condition in predicate");
    }
};

Array.prototype.skip = function <T>(this: T[], count: number): T[] {
    return this.slice(count);
};

Array.prototype.skipLast = function <T>(this: T[], count: number): T[] {
    return this.slice(0, this.length - count);
};

Array.prototype.skipWhile = function <T>(predicate: (element: T) => boolean): T[] {
    let i = 0;
    while (i < this.length && predicate(this[i++])) {
        /* tslint:disable:no-empty */
    }
    if (i >= this.length) {
        return [];
    }
    return this.slice(i - 1);
};

Array.prototype.take = function <T>(this: T[], count: number): T[] {
    return this.slice(0, count);
};

Array.prototype.takeLast = function <T>(this: T[], count: number): T[] {
    return this.slice(this.length - count, this.length);
};

Array.prototype.takeWhile = function <T>(predicate: (element: T) => boolean): T[] {
    let i = 0;
    while (i < this.length && predicate(this[i++])) {
        /* tslint:disable:no-empty */
    }
    if (i >= this.length) {
        return [...this];
    }
    return this.slice(0, i - 1);
};

Array.prototype.sum = function <T>(this: T[], selector?: (element: T) => number): number {
    if (this.length < 1) {
        throw new Error("Sequence contains no elements");
    }

    return selector !== undefined
        ? this.reduce((accumulator: number, element: T) => accumulator + selector(element), 0)
        : this.reduce((accumulator: number, element: T) => {
              if (typeof element === "number") {
                  return accumulator + element;
              } else {
                  throw Error("All array elements must be numbers");
              }
          }, 0);
};

Array.prototype.toDictionary = function <T, TKey, TElement>(
    this: T[],
    keySelector: (element: T) => TKey,
    elementSelector: (element: T) => TElement
): Map<TKey, TElement> {
    return new Map(this.map((element: T) => [keySelector(element), elementSelector(element)]));
};

Array.prototype.toHashSet = function <T>(this: T[]): Set<T> {
    return new Set(this);
};

Array.prototype.union = function <T>(this: T[], second: T[]): T[] {
    return second.reduce(
        (accumulator: T[], currentValue: T) =>
            accumulator.includes(currentValue) ? accumulator : [...accumulator, currentValue],
        [...new Set(this)]
    );
};

Array.prototype.where = function <T>(this: T[], predicate: (element: T) => boolean): T[] {
    return this.filter((element) => predicate(element));
};

Array.prototype.zip = function <T, TSecond, TResult>(
    this: T[],
    second: TSecond[],
    resultSelector: (firstElement: T, secondElement: TSecond) => TResult
): TResult[] {
    const result = [] as TResult[];

    for (let i = 0; i < this.length && i < second.length; ++i) {
        result.push(resultSelector(this[i], second[i]));
    }

    return result;
};
