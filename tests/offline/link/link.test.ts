import {
  resolverGetLinkprofessionnal,
  resolverGetLinkPatient,
  resolverLinkprofessionnalToPatient,
  resolverLinkPatientToprofessionnal,
  resolverRemoveLinkprofessionnal,
  resolverRemoveLinkPatient,
} from "../../../src/link/api/resolver";

const templateResolverLink = {
  LinkPatientToprofessionnal: async (code: number, patientId: string) => "success",
  LinkprofessionnalToPatient: async (professionnalId: string, email: string) => "success",
  getLinkPatient: async (patientId: string) => "success",
  getLinkprofessionnal: async (professionnalId: string) => "success",
  removeLinkPatient: async (patientEmail: string, professionalEmail : string) => "success",
  removeLinkprofessionnal: async (professionnalEmail: string, patientEmail : string) => "success",
};

describe("link test", () => {
  test("link patient to professionnal", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkPatientToprofessionnal: async (code: number, patientId: string) => "success",
    };

    const res = await resolverLinkPatientToprofessionnal(RepositoryLink, 1, "email");

    expect(res).toBe("success");
  });

  test("link professionnal to patient", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkprofessionnalToPatient: async (professionnalId: string, email: string) => "success",
    };

    const res = await resolverLinkprofessionnalToPatient(
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

  test("get link professionnal", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      getLinkprofessionnal: async (professionnalId: number) => "success",
    };

    const res = await RepositoryLink.getLinkprofessionnal(1);

    expect(res).toBe("success");
  });

  test("link patient to professionnal error", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkPatientToprofessionnal: async (code: number, patientId: string) => {
        throw new Error("error");
      },
    };

    try {
      await resolverLinkPatientToprofessionnal(RepositoryLink, 1, "a@a");
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

  test("resolver get link professionnal", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      getLinkprofessionnal: async (professionnalId: string) => {
        throw new Error("error");
      },
    };

    try {
      await resolverGetLinkprofessionnal(RepositoryLink, "1");
    } catch (e : any) {
      expect(e.message).toBe("error");
    }
  });

  test("resolver remove link patient", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      removeLinkPatient: async (patientEmail: string, professionalEmail : string) => {
        throw new Error("error");
      },
    };

    try {
      await resolverRemoveLinkPatient(RepositoryLink, "1", "2");
    } catch (e : any) {
      expect(e.message).toBe("error");
    }
  });

  test("resolver remove link professionnal", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      removeLinkprofessionnal: async (professionnalEmail: string, patientEmail : string) => {
        throw new Error("error");
      },
    };

    try {
      await resolverRemoveLinkprofessionnal(RepositoryLink, "1", "2");
    } catch (e : any) {
      expect(e.message).toBe("error");
    }
  });
});
