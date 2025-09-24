import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("array", () => {
    test("stringify array", () =>
        expect(stringify(["114",514,true])).toBe(`[6,12,"114",514,true]`));
    test("parse array", () =>
        expect(parse(`[6,12,"1919",810,false]`)).toEqual(["1919",810,false]));
});
