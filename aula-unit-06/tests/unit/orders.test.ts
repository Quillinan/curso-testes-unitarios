import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";
import { Order } from "@prisma/client";

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const orderInput: OrderInput = {
      client: "client",
      description: "description",
    };

    jest.spyOn(orderRepository, "create").mockImplementationOnce((): any => {
      return {
        protocol: new Date().getTime().toString(),
        status: "IN_PREPARATION",
      };
    });

    const order = await createOrder(orderInput);
    expect(order).toEqual({
      protocol: expect.any(String),
      status: "IN_PREPARATION",
    });
  });

  it("should return an order based on the protocol", async () => {
    type OrderOutput = Pick<Order, "protocol" | "status">;
    const orderOutput: OrderOutput = {
      protocol: new Date().getTime().toString(),
      status: "IN_PREPARATION",
    };

    jest
      .spyOn(orderRepository, "getByProtocol")
      .mockImplementationOnce((): any => {
        return {
          orderOutput,
        };
      });

    const order = await getOrderByProtocol(orderOutput.protocol);
    expect(order).toEqual({ orderOutput });
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    const protocol = new Date().getTime().toString();

    jest
      .spyOn(orderRepository, "getByProtocol")
      .mockImplementationOnce((): any => {});

    const order = await getOrderByProtocol(protocol);
    expect(order).toEqual({
      protocol,
      status: "INVALID",
    });
  });
});
