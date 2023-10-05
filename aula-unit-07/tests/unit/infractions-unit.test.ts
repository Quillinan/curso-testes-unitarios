import { generateUserWithNInfractions } from "../integration/factories/user-infractions-factory";
import * as infractionsService from "../../src/infractions-service";
import * as usersRepository from "../../src/users-repository";
import * as infractionsRepository from "../../src/infractions-repository";

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    const { user, infractions } = await generateUserWithNInfractions();
    const infraction = infractions[0];

    jest
      .spyOn(usersRepository, "getUserByDocument")
      .mockImplementationOnce((): any => {
        return {
          user,
        };
      });

    jest
      .spyOn(infractionsRepository, "getInfractionsFrom")
      .mockImplementationOnce((): any => {
        return {
          infraction,
        };
      });

    const result = await infractionsService.getInfractionsFrom(user.licenseId);

    expect(usersRepository.getUserByDocument).toBeCalled();
    expect(infractionsRepository.getInfractionsFrom).toBeCalled();

    expect(result).toEqual({
      user,
      infractions: {
        infraction,
      },
    });
  });

  it("should throw an error when driver license does not exists", async () => {
    const { user, infractions } = await generateUserWithNInfractions();
    const licenseId = user.licenseId;

    jest
      .spyOn(usersRepository, "getUserByDocument")
      .mockResolvedValue(undefined);

    const promise = infractionsService.getInfractionsFrom(licenseId);

    expect(promise).rejects.toEqual({
      type: "NOT_FOUND",
      message: "Driver not found.",
    });
  });
});
