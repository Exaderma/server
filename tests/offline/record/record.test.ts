import { resolverNewRecord, resolverGetRecord, resolverUpdateRecord } from "../../../src/record/api/resolver";

const templateResolverRecord = {
    NewRecord: async (description: string, type: string, patientEmail: string, doctorEmail: string) => "success",
    GetRecord: async (patientEmail: string, doctorEmail: string) => "success",
    UpdateRecord: async (id: number, description: string, type: string, patientEmail: string, doctorEmail: string) => "success",
};

describe("record test", () => {
    test("new record", async () => {
        const RepositoryRecord = {
            ...templateResolverRecord,
            NewRecord: async (description: string, type: string, patientEmail: string, doctorEmail: string) => "success",
        };

        const res = await resolverNewRecord(RepositoryRecord, "description", "type", "email", "email");

        expect(res).toBe("success");
    });

    test("get record", async () => {
        const RepositoryRecord = {
            ...templateResolverRecord,
            GetRecord: async (patientEmail: string, doctorEmail: string) => "success",
        };

        const res = await resolverGetRecord(RepositoryRecord, "email", "email");

        expect(res).toBe("success");
    });

    test("update record", async () => {
        const RepositoryRecord = {
            ...templateResolverRecord,
            UpdateRecord: async (id: number, description: string, type: string, patientEmail: string, doctorEmail: string) => "success",
        };

        const res = await resolverUpdateRecord(1, RepositoryRecord, "description", "type", "email", "email");

        expect(res).toBe("success");
    });
});