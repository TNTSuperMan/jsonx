import type { Serialized } from "./types";

const binary2hex = (bin: ArrayBufferLike | ArrayLike<number>) =>
    Array.from(new Uint8Array(bin as any)).map(e=>e.toString(16).padStart(2,"0")).join("");

export const stringify = (value: unknown): string => {
    const refs = new WeakMap<WeakKey, number>();
    let ref_count = 11;
    const addRef = (obj: object): number => {
        refs.set(obj, ++ref_count);
        return ref_count
    }
    
    const serialize = (value: unknown): Serialized => {
        switch(typeof value) {
            case "string": case "boolean": case "number":
                if(Number.isNaN(value))
                    return [9];
                else if(value === Infinity)
                    return [10];
                else if(value === -Infinity)
                    return [11];
                return value;
            case "bigint":
                return [value.toString()];
            case "undefined":
                return [];
            case "object":
                if(value === null)
                    return null;
                if(refs.has(value))
                    return [null, refs.get(value)!];
                if(value instanceof String)
                    return [0, addRef(value), value.toString()];
                if(value instanceof Boolean)
                    return [0, addRef(value), value.valueOf()];
                if(value instanceof Number)
                    return [0, addRef(value), value.valueOf()];
                if(value instanceof Date)
                    return [1, addRef(value), value.getTime()];
                if(value instanceof RegExp)
                    return [2, addRef(value), value.source, value.flags];
                if(value instanceof Blob)
                    throw new Error("Blob not implemented");
                if(value instanceof File)
                    throw new Error("File not implemented");
                if(ArrayBuffer.isView(value)){
                    switch(Object.getPrototypeOf(value)) {
                        case ArrayBuffer.prototype:       return [5, addRef(value), 0, binary2hex(value as any as ArrayBuffer)];
                        case Int8Array.prototype:         return [5, addRef(value), 1, binary2hex(value as any as Int8Array)];
                        case Uint8Array.prototype:        return [5, addRef(value), 2, binary2hex(value as any as Uint8Array)];
                        case Uint8ClampedArray.prototype: return [5, addRef(value), 3, binary2hex(value as any as Uint8ClampedArray)];
                        case Int16Array.prototype:        return [5, addRef(value), 4, binary2hex(value as any as Int16Array)];
                        case Uint16Array.prototype:       return [5, addRef(value), 5, binary2hex(value as any as Uint16Array)];
                        case Int32Array.prototype:        return [5, addRef(value), 6, binary2hex(value as any as Int32Array)];
                        case Uint32Array.prototype:       return [5, addRef(value), 7, binary2hex(value as any as Uint32Array)];
                        case Float16Array.prototype:      return [5, addRef(value), 8, binary2hex(value as any as Float16Array)];
                        case Float32Array.prototype:      return [5, addRef(value), 9, binary2hex(value as any as Float32Array)];
                        case Float64Array.prototype:      return [5, addRef(value), 10,binary2hex(value as any as Float64Array)];
                        case BigInt64Array.prototype:     return [5, addRef(value), 11,binary2hex(((value as any as BigInt64Array).buffer))];
                        case BigUint64Array.prototype:    return [5, addRef(value), 12,binary2hex(((value as any as BigUint64Array).buffer))];
                        case DataView.prototype:          return [5, addRef(value), 13,binary2hex(((value as any as DataView).buffer))];
                        default: throw new Error("Unknown ArrayBufferView", { cause: value });
                    }
                }
                if(Array.isArray(value))
                    return [6, addRef(value), ...value.map(serialize)];
                if(value instanceof Map)
                    return [7, addRef(value), value.entries().map(([k,v])=>[serialize(k), serialize(v)] as [Serialized, Serialized]).toArray()];
                if(value instanceof Set)
                    return [8, addRef(value), ...value.values().map(serialize)];

                const ref = addRef(value);
                return [Object.fromEntries(Object.entries(value).map(([k,v])=>[k,serialize(v)])), ref];
            case "function": case "symbol":
                throw new Error(`Not Supported type: ${typeof value}`);
        }
    }

    return JSON.stringify(serialize(value));
}
