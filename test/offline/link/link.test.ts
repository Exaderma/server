import { resolverLinkDoctorToPatient, resolverLinkPatientToDoctor } from "../../../src/link/api/resolver";

const templateResolverLink = {
  LinkPatientToDoctor: async (patientId: string, doctorId: string) => "success",
  LinkDoctorToPatient: async (doctorId: string, patientId: string) => "success",
};

describe("link test", () => {
  test("link patient to doctor", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkPatientToDoctor: async (patientId: string, doctorId: string) =>
        "success",
    };

    const res = await resolverLinkPatientToDoctor(RepositoryLink);

    expect(res).toBe("success");
  });

  test("link doctor to patient", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkDoctorToPatient: async (doctorId: string, patientId: string) =>
        "success",
    };

    const res = await resolverLinkDoctorToPatient(RepositoryLink);

    expect(res).toBe("success");
  });
});
