import type { Serialized } from "./types";

const hex2binary = (hex: string) => 
    new Uint8Array(hex.split("").map((e,i,a)=>!(i%2)?e+a[i+1]:"").filter(e=>e).map(e=>parseInt(e, 16)));

export const parse = (json: string): unknown => {
    const refs = new Map<number, WeakKey>();
    const ref = (id: number, obj: object) => {
        refs.set(id, obj);
        return obj;
    }

    const deserialize = (value: Serialized): unknown => {
        if(Array.isArray(value)){
            if(value[0] === undefined) return undefined;
            if(typeof value[0] === "object") {
                if(value[0] === null) return refs.get(value[1]);
                const obj: Record<string, unknown> = {};
                ref(value[1], obj);
                Object.entries(value[0]).forEach(([k, v]) => obj[k] = deserialize(v));
                return obj;
            }
            if(typeof value[0] === "string") return BigInt(value[0]);
            switch(value[0]){
                case 0:
                    switch(typeof value[2]){
                        case "string":
                            return ref(value[1], new String(value[2]));
                        case "boolean":
                            return ref(value[1], new Boolean(value[2]));
                        case "number":
                            return ref(value[1], new Number(value[2]));
                    }
                case 1:
                    return ref(value[1], new Date(value[2]));
                case 2:
                    return ref(value[1], new RegExp(value[2], value[3]));
                case 3:
                    return ref(value[1], new Blob([hex2binary(value[2])], { type: value[3] }));
                case 4:
                    return ref(value[1], new File([hex2binary(value[2])], value[3], { type: value[4] ?? undefined, lastModified: value[5] }));
                case 5:
                    const buf = hex2binary(value[3]);
                    switch(value[2]){
                        case 0: return buf.buffer;
                        case 1: return new Int8Array(buf);
                        case 2: return new Uint8Array(buf);
                        case 3: return new Uint8ClampedArray(buf);
                        case 4: return new Int16Array(buf);
                        case 5: return new Uint16Array(buf);
                        case 6: return new Int32Array(buf);
                        case 7: return new Uint32Array(buf);
                        case 8: return new Float16Array(buf);
                        case 9: return new Float32Array(buf);
                        case 10: return new Float64Array(buf);
                        case 11: return new BigInt64Array(buf.buffer);
                        case 12: return new BigUint64Array(buf.buffer);
                        case 13: return new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
                        default:
                            throw new Error(`Unknown buffer type: ${value[2]}`);
                    }
                case 6:
                    const [,, ...base] = value;
                    const arr: unknown[] = [];
                    ref(value[1], arr);
                    base.forEach(e=>arr.push(deserialize(e)));
                    return arr;
                case 7:
                    const map = new Map;
                    ref(value[1], map);
                    value[2].forEach(([k, v]) => map.set(deserialize(k), deserialize(v)));
                    return map;
                case 8:
                    const [,, ...setbase] = value;
                    const set = new Set;
                    ref(value[1], set);
                    setbase.forEach(e=>set.add(deserialize(e)));
                    return set;
                case 9:
                    return NaN;
                case 10:
                    return Infinity;
                case 11:
                    return -Infinity;
                default:
                    throw new Error(`Unknown type: ${value[0]}`);
            }
        }else{
            return value;
        }
    }

    return deserialize(JSON.parse(json));
}