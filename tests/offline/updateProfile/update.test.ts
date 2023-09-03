import { resolverUpdatePatientFirstName, resolverUpdatePatientEmail, resolverUpdatePatientLastName, resolverUpdatePatientPassword, resolverUpdatePatientPhone, resolverUpdateProfessionalAddress, resolverUpdateProfessionalDepartment, resolverUpdateProfessionalEmail, resolverUpdateProfessionalFirstName, resolverUpdateProfessionalLastName, resolverUpdateProfessionalPassword, resolverUpdateProfessionalPhone } from '../../../src/updateProfile/api/resolver';

const templateResolverUpdateProfile = {
    // Patient
    updatePatientFirstName : async (email : string, firstName : string) => "success",
    updatePatientLastName : async (email : string, lastName : string) => "success",
    updatePatientEmail : async (email : string, newEmail : string) => "success",
    updatePatientPassword : async (email : string, password : string) => "success",
    updatePatientPhone : async (email : string, phone : string) => "success",
    // Professional
    updateProfessionalFirstName : async (email : string, firstName : string) => "success",
    updateProfessionalLastName : async (email : string, lastName : string) => "success",
    updateProfessionalEmail : async (email : string, newEmail : string) => "success",
    updateProfessionalPassword : async (email : string, password : string) => "success",
    updateProfessionalPhone : async (email : string, phone : string) => "success",
    updateProfessionalDepartment : async (email : string, department : string) => "success",
    updateProfessionalAddress : async (email : string, address : string) => "success",
};

describe("update profile test", () => {
    test("update patient first name", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updatePatientFirstName: async (email: string, firstName: string) => "success",
        };

        const res = await resolverUpdatePatientFirstName("email", "firstName", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update patient last name", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updatePatientLastName: async (email: string, lastName: string) => "success",
        };

        const res = await resolverUpdatePatientLastName("email", "lastName", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update patient email", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updatePatientEmail: async (email: string, newEmail: string) => "success",
        };

        const res = await resolverUpdatePatientEmail("email", "newEmail", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update patient password", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updatePatientPassword: async (email: string, password: string) => "success",
        };

        const res = await resolverUpdatePatientPassword("email", "password", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update patient phone", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updatePatientPhone: async (email: string, phone: string) => "success",
        };

        const res = await resolverUpdatePatientPhone("email", "phone", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update professional first name", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updateProfessionalFirstName: async (email: string, firstName: string) => "success",
        };

        const res = await resolverUpdateProfessionalFirstName("email", "firstName", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update professional last name", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updateProfessionalLastName: async (email: string, lastName: string) => "success",
        };

        const res = await resolverUpdateProfessionalLastName("email", "lastName", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update professional email", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updateProfessionalEmail: async (email: string, newEmail: string) => "success",
        };

        const res = await resolverUpdateProfessionalEmail("email", "newEmail", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update professional password", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updateProfessionalPassword: async (email: string, password: string) => "success",
        };

        const res = await resolverUpdateProfessionalPassword("email", "password", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update professional phone", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updateProfessionalPhone: async (email: string, phone: string) => "success",
        };

        const res = await resolverUpdateProfessionalPhone("email", "phone", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update professional address", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updateProfessionalAddress: async (email: string, address: string) => "success",
        };

        const res = await resolverUpdateProfessionalAddress("email", "address", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });

    test("update professional department", async () => {
        const RepositoryUpdateProfile = {
            ...templateResolverUpdateProfile,
            updateProfessionalDepartment: async (email: string, department: string) => "success",
        };

        const res = await resolverUpdateProfessionalDepartment("email", "department", RepositoryUpdateProfile);

        expect(res).toBe("success");
    });
});
