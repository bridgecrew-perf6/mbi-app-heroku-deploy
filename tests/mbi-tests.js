"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mbi_1 = require("../server/mbi");
describe("MBI.Generate", () => {
    test("it runs without error and generates the correct length", () => {
        const result = mbi_1.MBI.Generate();
        expect(result.length).toBe(11);
        for (var i = 0; i < 10000; i++) {
            const mbi = mbi_1.MBI.Generate();
            const result = mbi_1.MBI.Verify(mbi);
            if (!result) {
                expect(result).toBe(true);
            }
        }
    });
});
describe("MBI.Verify", () => {
    const cases = [
        { mbi: "5FF3N35RR61", isValid: true },
        { mbi: "0BF3N35RR61", isValid: false },
        { mbi: "", isValid: false },
        { mbi: "5FF3N35RR612", isValid: false },
        { mbi: "5FF3N35RR6Z", isValid: false },
        { mbi: "<!%&{(.*)}>", isValid: false },
        { mbi: "0FF3N35RR61", isValid: false }
    ];
    test.each(cases)('MBI: $mbi is valid: $isValid', (c) => {
        expect(mbi_1.MBI.Verify(c.mbi)).toBe(c.isValid);
    });
});
describe("MBI.Format", () => {
    const cases = [
        { mbi: "0FF3N35RR61", result: "0FF3-N35-RR61" },
        { mbi: "", result: "" }
    ];
    test.each(cases)('MBI: $mbi formatted: $result', (c) => {
        expect(mbi_1.MBI.Format(c.mbi)).toBe(c.result);
    });
});
//# sourceMappingURL=mbi-tests.js.map