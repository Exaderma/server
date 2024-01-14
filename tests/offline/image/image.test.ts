import { resolverSetPatientImageProfile, resolverGetPatientImageProfile, resolverGetProfessionalImageProfile, resolverSetProfessionalImageProfile, resolverGetAllFolder, resolverGetImageGallery, resolverSetImageGallery, resolverRemoveFolder, resolverRemoveImageGallery, resolverRemoveImages } from "../../../src/image/api/resolver";

const templateResolverImage = {
    SetPatientImageProfile: async (data: string, patientEmail: string) => "success",
    GetPatientImageProfile: async (patientEmail: string) => "success",
    GetProfessionalImageProfile: async (professionalEmail: string) => "success",
    SetProfessionalImageProfile: async (data: string, professionalEmail: string) => "success",
    SetImageGallery: async (data: string, patientEmail: string) => "success",
    GetImageGallery: async (patientEmail: string) => [{data: "success", id: 1}],
    GetAllFolder: async (professionalEmail: string) => [{id: 1, name: "name", data: [{image: "success"}]}],
    removeImageGallery: async (patientEmail: string, id_image: number, id_patient?: number) => "success",
    removeFolder: async (professionalEmail: string, id_folder: number) => "success",
    removeImages: async (professionalEmail: string, id_folder: number, id_image: number[]) => "success",
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
            GetImageGallery: async (patientEmail: string) => [{data: "success", id: 1}],
        };

        const res = await resolverGetImageGallery(RepositoryImage, "email");

        expect(res).toStrictEqual([{data: "success", id: 1}]);
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

    test("remove folder", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            removeFolder: async (professionalEmail: string, id_folder: number) => "success",
        };

        const res = await resolverRemoveFolder(RepositoryImage, "email", 1);

        expect(res).toBe("success");
    });

    test("remove image gallery", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            removeImageGallery: async (patientEmail: string, id_image: number, id_patient?: number) => "success",
        };

        const res = await resolverRemoveImageGallery(RepositoryImage, "email", 1);

        expect(res).toBe("success");
    });

    test("remove images", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            removeImages: async (professionalEmail: string, id_folder: number, id_image: number[]) => "success",
        };

        const res = await resolverRemoveImages(RepositoryImage, "email", 1, [1]);

        expect(res).toBe("success");
    });

    test("remove images with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            removeImages: async (professionalEmail: string, id_folder: number, id_image: number[]) => "error",
        };

        const res = await resolverRemoveImages(RepositoryImage, "email", 1, [1]);

        expect(res).toBe("error");
    });

    test("remove folder with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            removeFolder: async (professionalEmail: string, id_folder: number) => "error",
        };

        const res = await resolverRemoveFolder(RepositoryImage, "email", 1);

        expect(res).toBe("error");
    });

    test("remove image gallery with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            removeImageGallery: async (patientEmail: string, id_image: number, id_patient?: number) => "error",
        };

        const res = await resolverRemoveImageGallery(RepositoryImage, "email", 1);

        expect(res).toBe("error");
    });

    test("get folder professional with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetAllFolder: async (professionalEmail: string) => [],
        };

        const res = await resolverGetAllFolder(RepositoryImage, "email");

        expect(res).toStrictEqual([]);
    });

    test("get all folder with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetAllFolder: async (professionalEmail: string) => [],
        };

        const res = await resolverGetAllFolder(RepositoryImage, "email");

        expect(res).toStrictEqual([]);
    });

    test("get image gallery with an error", async () => {
        const RepositoryImage = {
            ...templateResolverImage,
            GetImageGallery: async (patientEmail: string) => [],
        };

        const res = await resolverGetImageGallery(RepositoryImage, "email");

        expect(res).toStrictEqual([]);
    });
});