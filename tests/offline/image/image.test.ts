import { resolverSetPatientImageProfile, resolverGetPatientImageProfile } from "../../../src/image/api/resolver";

const templateResolverImage = {
    SetPatientImageProfile: async (data: string, patientEmail: string) => "success",
    GetPatientImageProfile: async (patientEmail: string) => "success",
};

describe("image test", () => {
    test("set patient image profile", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            SetPatientImageProfile: async (data: string, patientEmail: string) => "success",
        };

        const res = await resolverSetPatientImageProfile(RepositoryImage, "data", "email");

        expect(res).toBe("success");
    });

    test("get patient image profile", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetPatientImageProfile: async (patientEmail: string) => "success",
        };

        const res = await resolverGetPatientImageProfile(RepositoryImage, "email");

        expect(res).toBe("success");
    });
});