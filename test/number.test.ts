import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("number", () => {
    test("stringify number", () => 
        expect(stringify(128)).toBe(`128`));
    test("parse number", () => 
        expect(parse(`128`)).toBe(128));

    test("stringify NaN", () => 
        expect(stringify(NaN)).toBe(`[9]`));
    test("parse NaN", () => 
        expect(parse(`[9]`)).toBe(NaN));
    
    test("stringify Infinity", () => 
        expect(stringify(Infinity)).toBe(`[10]`));
    test("parse number", () => 
        expect(parse(`[10]`)).toBe(Infinity));
    
    test("stringify -Infinity", () => 
        expect(stringify(-Infinity)).toBe(`[11]`));
    test("parse number", () => 
        expect(parse(`[11]`)).toBe(-Infinity));
});
