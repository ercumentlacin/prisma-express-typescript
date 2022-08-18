export function responseBody<T extends object>(source: T): T {
    class Builder {
        public constructor(public data: T) {}
    }

    return new Builder(source).data;
}
