import { resolverSetPatientImageProfile, resolverGetPatientImageProfile, resolverGetProfessionalImageProfile, resolverSetProfessionalImageProfile } from "../../../src/image/api/resolver";

const templateResolverImage = {
    SetPatientImageProfile: async (data: string, patientEmail: string) => "success",
    GetPatientImageProfile: async (patientEmail: string) => "success",
    GetProfessionalImageProfile: async (professionalEmail: string) => "success",
    SetProfessionalImageProfile: async (data: string, professionalEmail: string) => "success",
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

    test("get professional image profile", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetProfessionalImageProfile: async (professionalEmail: string) => "success",
        };

        const res = await resolverGetProfessionalImageProfile(RepositoryImage, "email");

        expect(res).toBe("success");
    });

    test("set professional image profile", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            SetProfessionalImageProfile: async (data: string, professionalEmail: string) => "success",
        };

        const res = await resolverSetProfessionalImageProfile(RepositoryImage, "data", "email");

        expect(res).toBe("success");
    });
});