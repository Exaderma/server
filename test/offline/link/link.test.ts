import { resolverLinkDoctorToPatient, resolverLinkPatientToDoctor } from "../../../src/link/api/resolver";

const templateResolverLink = {
  LinkPatientToDoctor: async (code : number, patientId : number) => ("success"),
  LinkDoctorToPatient: async (doctorId: number, email: string) => ("success"),
  getLinkPatient: async (patientId: number) => 'success',
  getLinkDoctor: async (doctorId: number) => 'success',
};

describe("link test", () => {
  test("link patient to doctor", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkPatientToDoctor: async (code : number, patientId : number) =>
        "success",
    };

    const res = await resolverLinkPatientToDoctor(RepositoryLink, 1, 1);

    expect(res).toBe("success");
  });

  test("link doctor to patient", async () => {
    const RepositoryLink = {
      ...templateResolverLink,
      LinkDoctorToPatient: async (doctorId: number, email: string) =>
        "success",
    };

    const res = await resolverLinkDoctorToPatient(RepositoryLink, 1, "test@test.com");

    expect(res).toBe("success");
  });
});
