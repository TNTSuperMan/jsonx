import type { Serialized } from "./types";

const binary2hex = (bin: number[]) =>
    bin.reduce((p,v)=>p.concat(v.toString(16).padStart(2, "0")),"");

export const stringify = (value: unknown): string => {
    const refs = new WeakMap<WeakKey, number>();
    let ref_count = 10;
    const addRef = (obj: object): number => {
        refs.set(obj, ++ref_count);
        return ref_count
    }
    
    const serialize = (value: unknown): Serialized => {
        switch(typeof value) {
            case "string": case "boolean": case "number":
                if(Number.isNaN(value))
                    return [8];
                else if(value === Infinity)
                    return [9];
                else if(value === -Infinity)
                    return [10];
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
                if(value instanceof Date)
                    return [0, addRef(value), value.getTime()];
                if(value instanceof RegExp)
                    return [1, addRef(value), value.source, value.flags];
                if(value instanceof Blob)
                    throw new Error("Blob not implemented");
                if(value instanceof File)
                    throw new Error("File not implemented");
                if(ArrayBuffer.isView(value)){
                    const hex = binary2hex(Array.from(new Uint8Array(value.buffer)));
                    const type =
                        value instanceof ArrayBuffer ? 0 :
                        value instanceof Int8Array ? 1 :
                        value instanceof Uint8Array ? 2 :
                        value instanceof Uint8ClampedArray ? 3 :
                        value instanceof Int16Array ? 4 :
                        value instanceof Uint16Array ? 5 :
                        value instanceof Int32Array ? 6 :
                        value instanceof Uint32Array ? 7 :
                        value instanceof Float16Array ? 8 :
                        value instanceof Float32Array ? 9 :
                        value instanceof Float64Array ? 10 :
                        value instanceof BigInt64Array ? 11 :
                        value instanceof BigUint64Array ? 12 :
                        value instanceof DataView ? 13 :
                        null;
                    if(type === null)
                        throw new Error("Unknown ArrayBufferView", { cause: value });

                    return [4, addRef(value), type, hex];
                }
                if(Array.isArray(value))
                    return [5, addRef(value), ...value.map(serialize)];
                if(value instanceof Map)
                    return [6, addRef(value), value.entries().map(([k,v])=>[serialize(k), serialize(v)] as [Serialized, Serialized]).toArray()];
                if(value instanceof Set)
                    return [7, addRef(value), ...value.values().map(serialize)];

                const ref = addRef(value);
                return [Object.fromEntries(Object.entries(value).map(([k,v])=>[k,serialize(v)])), ref];
            case "function": case "symbol":
                throw new Error(`Not Supported type: ${typeof value}`);
        }
    }

    return JSON.stringify(serialize(value));
}
