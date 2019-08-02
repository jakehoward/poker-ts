export function head<T>(xs: T[]): T {
    if (xs.length) {
        return xs[0];
    }
    throw new Error("Can't call head on an empty list");
}

export function tail<T>(xs: T[]): T[] {
    return xs.slice(1)
}

export function foldLeftWithDefault<T, U>(fn: (acc: U, t: T) => U, xs: T[], currentAcc: U): U {
    if (not(xs.length)) {
        return currentAcc;
    }
    return foldLeftWithDefault(fn, tail(xs), fn(currentAcc, head(xs)));
}

export function foldLeft<T>(fn: (acc: T, t: T) => T, xs: T[]): T {
    return foldLeftWithDefault(fn, tail(xs), head(xs))
}

export function flatMap<T, U>(fn: (t: T) => U[], xs: T[]): U[] {
    return foldLeftWithDefault((acc: U[], item: T) => acc.concat(fn(item)), xs, []);
}

export function map<T, U>(fn: (t: T) => U, xs: T[]): U[] {
    return foldLeftWithDefault((acc: U[], item: T) => [...acc, fn(item)], xs, []);
}

export function range(start: number, endNotInlc: number): number[] {
    const nums = [];
    for(let i = 0; i < endNotInlc; ++i) {
        nums.push(i);
    }
    return nums;
}

export function not(a: any): boolean {
    return !a;
}

export function take<T>(n: number, xs: T[]): T[] {
    return xs.slice(0, n);
}

export function drop<T>(n: number, xs: T[]): T[] {
    return xs.slice(n);
}
