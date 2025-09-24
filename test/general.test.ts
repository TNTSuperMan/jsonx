import { test, expect } from "bun:test";
import { parse, stringify } from "../src";

test("General consistency", () => {
    const object: any = {
        numbers: [
            114514, NaN, Infinity, -Infinity
        ],
        tools: new Set(["Bun", "Node.js", "Deno"]),
        now: new Date(),
        reg: /\/\*(.*)\*\//gi,
        score: new Map<unknown, unknown>([
            ["AWS", 90],
            ["Azure", 1000000000000000000000000000000000n],
            ["Google Cloud Platform", Number.MIN_SAFE_INTEGER]
        ]),
        buf: {
            arrayBuffer: new ArrayBuffer(),
            int8Array: new Int8Array(),
            uint8Array: new Uint8Array(),
            uint8ClampedArray: new Uint8ClampedArray(),
            int16Array: new Int16Array(),
            uint16Array: new Uint16Array(),
            int32Array: new Int32Array(),
            uint32Array: new Uint32Array(),
            float16Array: new Float16Array(),
            float32Array: new Float32Array(),
            float64Array: new Float64Array(),
            bigInt64Array: new BigInt64Array(),
            bigUint64Array: new BigUint64Array()
        }
    };
    object.self = object;

    const jsonx = stringify(object);
    const copy = parse(jsonx);

    expect(copy).toEqual(object);
});
