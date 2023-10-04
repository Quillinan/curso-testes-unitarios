import calculator from "calculator";

describe("calculator unit test suite", () => {
  it("should return sum of numbers", async () => {
    const n1 = await generateNumber();
    const n2 = await generateNumber();
    const sum = calculator.sum(n1, n2);
    expect(sum).toBe(n1 + n2);
  });

  it("should return sub of numbers", async () => {
    const n1 = await generateNumber();
    const n2 = await generateNumber();
    const sub = calculator.sub(n1, n2);
    expect(sub).toBe(n1 - n2);
  });

  it("should return 0", async () => {
    const n1 = await generateNumber();
    const n2 = 0;
    const div = calculator.div(n1, n2);
    expect(div).toBe(0);
  });

  it("should return div of numbers", async () => {
    const n1 = await generateNumber();
    let n2 = await generateNumber();
    while (n2 === 0) {
      n2 = await generateNumber();
    }
    const div = calculator.div(n1, n2);
    expect(div).toBe(n1 / n2);
  });

  it("should return mul of numbers", async () => {
    const n1 = await generateNumber();
    const n2 = await generateNumber();
    const mul = calculator.mul(n1, n2);
    expect(mul).toBe(n1 * n2);
  });
});

async function generateNumber() {
  return Math.floor(Math.random() * 100);
}
