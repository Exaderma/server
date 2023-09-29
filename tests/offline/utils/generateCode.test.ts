import { generateRandomNumber, generateRandomString, generateUUID } from "../../../src/utils/code";

describe("generateCode test", () => {
    test("generate uuid", async () => {
        const res = generateUUID();
        expect(res).toBeDefined();
        expect(res.length).toBe(36);
    });

    test("generate random number", async () => {
        const res = generateRandomNumber(100);
        expect(res).toBeDefined();
        expect(res).toBeLessThan(999);
    });

    test("generate random number without size", async () => {
        const res = generateRandomNumber();
        expect(res).toBeDefined();
    });

    test("generate random string", async () => {
        const res = generateRandomString(100);
        expect(res).toBeDefined();
        expect(res.length).toBe(100);
    });

    test("generate random string without size", async () => {
        const res = generateRandomString();
        expect(res).toBeDefined();
    });
});
