import { resolverSetPatientImageProfile, resolverGetPatientImageProfile, resolverGetProfessionalImageProfile, resolverSetProfessionalImageProfile, resolverGetAllFolder, resolverGetImageGallery, resolverSetImageGallery } from "../../../src/image/api/resolver";

const templateResolverImage = {
    SetPatientImageProfile: async (data: string, patientEmail: string) => "success",
    GetPatientImageProfile: async (patientEmail: string) => "success",
    GetProfessionalImageProfile: async (professionalEmail: string) => "success",
    SetProfessionalImageProfile: async (data: string, professionalEmail: string) => "success",
    SetImageGallery: async (data: string, patientEmail: string) => "success",
    GetImageGallery: async (patientEmail: string) => [{data: "success"}],
    GetAllFolder: async (professionalEmail: string) => [{id: 1, name: "name", data: [{image: "success"}]}],
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

    test("set image gallery", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            SetImageGallery: async (data: string, patientEmail: string) => "success",
        };

        const res = await resolverSetImageGallery(RepositoryImage, "data", "email");

        expect(res).toBe("success");
    });

    test("set image with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            SetImageGallery: async (data: string, patientEmail: string) => "error",
        };

        const res = await resolverSetImageGallery(RepositoryImage, "data", "email");

        expect(res).toBe("error");
    });

    test("get image gallery", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetImageGallery: async (patientEmail: string) => [{data: "success"}],
        };

        const res = await resolverGetImageGallery(RepositoryImage, "email");

        expect(res).toStrictEqual([{data: "success"}]);
    });

    test("get image gallery with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetImageGallery: async (patientEmail: string) => [],
        };

        const res = await resolverGetImageGallery(RepositoryImage, "email");

        expect(res).toStrictEqual([]);
    });

    test("get folder professional", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetAllFolder: async (professionalEmail: string) => [{id: 1, name: "name", data: [{image: "success"}]}],
        };

        const res = await resolverGetAllFolder(RepositoryImage, "email");

        expect(res).toStrictEqual([{id: 1, name: "name", data: [{image: "success"}]}]);
    });

    test("get all folder", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetAllFolder: async (professionalEmail: string) => [{id: 1, name: "name", data: [{image: "success"}]}],
        };

        const res = await resolverGetAllFolder(RepositoryImage, "email");

        expect(res).toStrictEqual([{id: 1, name: "name", data: [{image: "success"}]}]);
    });
});