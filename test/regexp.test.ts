import { describe, test, expect } from "bun:test";
import { parse, stringify } from "../src";

describe("regexp", () => {
    test("stringify regexp", () =>
        expect(stringify(/deadbeef/gi)).toBe(`[2,12,"deadbeef","gi"]`));
    test("parse regexp", () =>
        expect(parse(`[2,12,"hogehoge","mu"]`)).toEqual(/hogehoge/mu));
});
