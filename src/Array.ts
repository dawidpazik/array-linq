interface Array<T> {
    where(predicate: (item: T) => boolean): Array<T>;
}

Array.prototype.where = function<T>(this: Array<T>, predicate: (item: T) => boolean): Array<T> {
    return this.filter(item => predicate(item));
};
