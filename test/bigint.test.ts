import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("bigint", () => {
    test("stringify bigint", () =>
        expect(stringify(1145141919810n)).toBe(`["1145141919810"]`));
    test("parse bigint", () =>
        expect(parse(`["1145141919810"]`)).toBe(1145141919810n));
});
