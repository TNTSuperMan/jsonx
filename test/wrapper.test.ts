import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("wrapper", () => {
    test("stringify string wrapper", () =>
        expect(stringify(new String("Foo"))).toBe(`[0,12,"Foo"]`));
    test("parse string wrapper", () =>
        expect(parse(`[0,12,"Bar"]`)).toEqual(new String("Bar")));
    test("stringify boolean wrapper", () =>
        expect(stringify(new Boolean(false))).toBe(`[0,12,false]`));
    test("parse boolean wrapper", () =>
        expect(parse(`[0,12,true]`)).toEqual(new Boolean(true)));
    test("stringify number wrapper", () =>
        expect(stringify(new Number(114514))).toBe(`[0,12,114514]`));
    test("parse number wrapper", () =>
        expect(parse(`[0,12,1919810]`)).toEqual(new Number(1919810)));
});
