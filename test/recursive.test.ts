import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("recursive", () => {
    test("stringify recursive", () => {
        const obj: any = {};
        obj.self = obj;
        expect(stringify(obj)).toBe(`[{"self":[null,12]},12]`);
    });
    test("parse recursive", () => {
        const obj: any = {};
        obj.my = obj;
        expect(parse(`[{"my":[null,12]},12]`)).toEqual(obj);
    });
});
