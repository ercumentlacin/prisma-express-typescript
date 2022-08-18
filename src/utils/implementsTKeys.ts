export function implementsTKeys<T>(obj: any, keys: (keyof T)[]): obj is T {
    if (!obj || !Array.isArray(keys)) {
        return false;
    }

    const implementKeys = keys.reduce((impl, key) => impl && key in obj, true);

    return implementKeys;
}
