import {
  resolverGetLinkDoctor,
  resolverGetLinkPatient,
  resolverLinkDoctorToPatient,
  resolverLinkPatientToDoctor,
} from "../../../src/link/api/resolver";

const templateResolverLink = {
  LinkPatientToDoctor: async (code: number, patientId: string) => "success",
  LinkDoctorToPatient: async (doctorId: string, email: string) => "success",
  getLinkPatient: async (patientId: string) => "success",
  getLinkDoctor: async (doctorId: string) => "success",
};

describe("link test", () => {
  test("link patient to doctor", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkPatientToDoctor: async (code: number, patientId: string) => "success",
    };

    const res = await resolverLinkPatientToDoctor(RepositoryLink, 1, "email");

    expect(res).toBe("success");
  });

  test("link doctor to patient", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkDoctorToPatient: async (doctorId: string, email: string) => "success",
    };

    const res = await resolverLinkDoctorToPatient(
      RepositoryLink,
      "email@email.co",
      "test@test.com",
    );

    expect(res).toBe("success");
  });

  test("get link patient", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      getLinkPatient: async (patientId: number) => "success",
    };

    const res = await RepositoryLink.getLinkPatient(1);

    expect(res).toBe("success");
  });

  test("get link doctor", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      getLinkDoctor: async (doctorId: number) => "success",
    };

    const res = await RepositoryLink.getLinkDoctor(1);

    expect(res).toBe("success");
  });

  test("link patient to doctor error", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkPatientToDoctor: async (code: number, patientId: string) => {
        throw new Error("error");
      },
    };

    try {
      await resolverLinkPatientToDoctor(RepositoryLink, 1, "a@a");
    } catch (e : any) {
      expect(e.message).toBe("error");
    }
  });

  test("resolver get link patient", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      getLinkPatient: async (patientId: string) => {
        throw new Error("error");
      },
    };

    try {
      await resolverGetLinkPatient(RepositoryLink, "1");
    } catch (e : any) {
      expect(e.message).toBe("error");
    }
  });

  test("resolver get link doctor", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      getLinkDoctor: async (doctorId: string) => {
        throw new Error("error");
      },
    };

    try {
      await resolverGetLinkDoctor(RepositoryLink, "1");
    } catch (e : any) {
      expect(e.message).toBe("error");
    }
  });
});
