import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
  return {
    v4: () => {
      return "valor simulado no mock";
    },
  };
});

describe("generateProtocolForPacient", () => {
  it("deve gerar um protocolo com os valores corretos", () => {
    const name = "John";
    const lastName = "Doe";
    const priority = true;

    const result = generateProtocolForPacient(name, lastName, priority);

    expect(result).toEqual({
      priority: true,
      date: new Date(),
      pacient: "John Doe",
      protocol: "valor simulado no mock",
    });
  });
});
