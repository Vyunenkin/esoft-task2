function deepClone(obj, hash = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;
    
    if (hash.has(obj)) return hash.get(obj);
    
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Map) {
        const map = new Map();
        hash.set(obj, map);
        obj.forEach((value, key) => map.set(key, deepClone(value, hash)));
        return map;
    }
    if (obj instanceof Set) {
        const set = new Set();
        hash.set(obj, set);
        obj.forEach(value => set.add(deepClone(value, hash)));
        return set;
    }
    
    const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    hash.set(obj, clone);
    
    [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].forEach(key => {
        clone[key] = deepClone(obj[key], hash);
    });
    
    return clone;
}

const obj = {
    num: 42,
    str: "Hello",
    bool: true,
    date: new Date(),
    reg: /test/gi,
    arr: [1, 2, { a: 3 }],
    nested: { foo: "bar" },
    map: new Map([["key", "value"]]),
    set: new Set([1, 2, 3]),
    func: function() { return "Hello"; },
    [Symbol("id")]: 123,
};

obj.circular = obj;

const clonedObj = deepClone(obj);
console.log(clonedObj);
