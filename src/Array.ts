interface Array<T> {
    aggregate<TAccumulate, TResult>(
        seed: TAccumulate,
        func: (accumulator: TAccumulate, element: T) => TAccumulate,
        resultSelector: (accumulator: TAccumulate) => TResult
    ): TResult;
    all(predicate: (element: T) => boolean): boolean;
    any(predicate: (element: T) => boolean): boolean;
    append(element: T): Array<T>;
    average(): number;
    average(selector: (element: T) => number): number;
    contains(elment: T): boolean;
    count(): number;
    defultIfEmpty(defaultValue: T): Array<T>;
    distinct(): Array<T>;
    elementAt(index: number): T;
    elementAtOrUndefined(index: number): T | undefined;
    except(second: Array<T>): Array<T>;
    first(): T;
    first(prdicate: (element: T) => boolean): T;
    firstOrUndefined(): T | undefined;
    firstOrUndefined(prdicate: (element: T) => boolean): T | undefined;
    groupBy<TKey>(keySelector: (element: T) => TKey): Map<TKey, Array<T>>;
    groupJoin<TInner, TKey, TResult>(
        inner: Array<TInner>,
        outerKeySelector: (element: T) => TKey,
        innerKeySelector: (innerElement: TInner) => TKey,
        resultSelector: (element: T, innerElements: Array<TInner>) => TResult
    ): Array<TResult>;
    innerJoin<TInner, TKey, TResult>(
        inner: Array<TInner>,
        outerKeySelector: (element: T) => TKey,
        innerKeySelector: (innerElement: TInner) => TKey,
        resultSelector: (element: T, innerElement: TInner) => TResult
    ): Array<TResult>;
    sum(): number;
    sum(selector: (element: T) => number): number;
    where(predicate: (element: T) => boolean): Array<T>;
}

Array.prototype.aggregate = function<T, TAccumulate, TResult>(
    this: Array<T>,
    seed: TAccumulate,
    func: (accumulator: TAccumulate, element: T) => TAccumulate,
    resultSelector: (accumulator: TAccumulate) => TResult
): TResult {
    return resultSelector(this.reduce((accumulator: TAccumulate, element: T) => func(accumulator, element), seed));
};

Array.prototype.all = function<T>(this: Array<T>, predicate: (element: T) => boolean): boolean {
    return this.every(element => predicate(element));
};

Array.prototype.any = function<T>(this: Array<T>, predicate: (element: T) => boolean): boolean {
    return this.some(predicate);
};

Array.prototype.append = function<T>(this: Array<T>, element: T): Array<T> {
    return [...this, element];
};

Array.prototype.average = function<T>(this: Array<T>, selector?: (element: T) => number): number {
    if (this.length < 1) {
        throw new Error("Sequence contains no elements");
    }

    return (selector !== undefined ? this.sum(selector) : this.sum()) / this.length;
};

Array.prototype.contains = function<T>(this: Array<T>, element: T): boolean {
    return this.includes(element);
};

Array.prototype.count = function<T>(this: Array<T>): number {
    return this.length;
};

Array.prototype.defultIfEmpty = function<T>(this: Array<T>, defaultValue: T): Array<T> {
    return this.length > 0 ? this : [defaultValue];
};

Array.prototype.distinct = function<T>(this: Array<T>): Array<T> {
    return [...new Set(this)];
};

Array.prototype.elementAt = function<T>(this: Array<T>, index: number): T {
    if (index < 0 || index >= this.length) {
        throw new Error("Index out of range");
    }

    return this[index];
};

Array.prototype.elementAtOrUndefined = function<T>(this: Array<T>, index: number): T | undefined {
    if (index < 0 || index >= this.length) {
        return undefined;
    }

    return this[index];
};

Array.prototype.except = function<T>(this: Array<T>, second: Array<T>): Array<T> {
    return this.filter(element => !second.includes(element));
};

Array.prototype.first = function<T>(this: Array<T>, predicate?: (element: T) => boolean): T {
    if (this.length < 1) {
        throw Error("The source sequence is empty");
    }
    if (predicate === undefined) {
        return this[0];
    }

    for (let i = 0; i < this.length; ++i) {
        if (predicate(this[i])) {
            return this[i];
        }
    }

    throw Error("No element satisfies the condition in predicate");
};

Array.prototype.firstOrUndefined = function<T>(this: Array<T>, predicate?: (element: T) => boolean): T | undefined {
    if (this.length < 1) {
        return undefined;
    }
    if (predicate === undefined) {
        return this[0];
    }

    for (let i = 0; i < this.length; ++i) {
        if (predicate(this[i])) {
            return this[i];
        }
    }

    return undefined;
};

Array.prototype.groupBy = function<T, TKey>(keySelector: (element: T) => TKey): Map<TKey, Array<T>> {
    return this.reduce((accumulator: Map<TKey, Array<T>>, element: T) => {
        const key = keySelector(element);
        const group = accumulator.get(key);
        if (group === undefined) {
            accumulator.set(key, [element]);
        } else {
            group.push(element);
        }
        return accumulator;
    }, new Map<TKey, Array<T>>());
};

Array.prototype.groupJoin = function<T, TInner, TKey, TResult>(
    this: Array<T>,
    inner: Array<TInner>,
    outerKeySelector: (element: T) => TKey,
    innerKeySelector: (innerElement: TInner) => TKey,
    resultSelector: (element: T, innerElements: Array<TInner>) => TResult
): Array<TResult> {
    const result = [] as Array<TResult>;

    this.forEach((element: T) => {
        const matchingInnerElements = [] as Array<TInner>;
        inner.forEach((innerElement: TInner) => {
            if (outerKeySelector(element) === innerKeySelector(innerElement)) {
                matchingInnerElements.push(innerElement);
            }
        });
        result.push(resultSelector(element, matchingInnerElements));
    });

    return result;
};

Array.prototype.innerJoin = function<T, TInner, TKey, TResult>(
    inner: Array<TInner>,
    outerKeySelector: (element: T) => TKey,
    innerKeySelector: (innerElement: TInner) => TKey,
    resultSelector: (element: T, innerElement: TInner) => TResult
): Array<TResult> {
    const result = [] as Array<TResult>;

    this.forEach((element: T) => {
        inner.forEach((innerElement: TInner) => {
            if (outerKeySelector(element) === innerKeySelector(innerElement)) {
                result.push(resultSelector(element, innerElement));
            }
        });
    });

    return result;
};

Array.prototype.sum = function<T>(this: Array<T>, selector?: (element: T) => number): number {
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

Array.prototype.where = function<T>(this: Array<T>, predicate: (element: T) => boolean): Array<T> {
    return this.filter(element => predicate(element));
};
