import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

// TODO: バグ修正したら改善する

describe("buffer", () => {
    const buffer = new Uint8Array([114,51,41,91,98,10,0,0]);
    const hex = buffer.toHex();
    const test_buf = (buf: unknown, name: string, i: number) => {
        test(`stringify ${name}`, () =>
            expect(stringify(buf)).toBe(`[5,12,${i},"${hex}"]`));
        test(`parse ${name}`, () =>
            expect(parse(`[5,12,${i},"${hex}"]`)).toEqual(buf));
    }

    test_buf(buffer.buffer, "ArrayBuffer", 0);
    test_buf(new Int8Array(buffer), "Int8Array", 1);
    test_buf(new Uint8Array(buffer), "Uint8Array", 2);
    test_buf(new Uint8ClampedArray(buffer), "Uint8ClampedArray", 3);
    test_buf(new Int16Array(buffer), "Int16Array", 4);
    test_buf(new Uint16Array(buffer), "Uint16Array", 5);
    test_buf(new Int32Array(buffer), "Int32Array", 6);
    test_buf(new Uint32Array(buffer), "Uint32Array", 7);
    test_buf(new Float16Array(buffer), "Float16Array", 8);
    test_buf(new Float32Array(buffer), "Float32Array", 9);
    test_buf(new Float64Array(buffer), "Float64Array", 10);
    test_buf(new BigInt64Array(buffer.buffer), "BigInt64Array", 11);
    test_buf(new BigUint64Array(buffer.buffer), "BigUint64Array", 12);
    test_buf(new DataView(buffer.buffer), "DataView", 13);
});
