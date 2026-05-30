import { analyzeStructure } from "../src/services/analyzeStructure";

describe("analyzeStructure", () => {

  it("should detect invalid subcategories", () => {

    const structure = {
      id: 1,
      name: "Root",
      active: true,
      subcategories: "invalid",
    };

    const result = analyzeStructure(structure);

    expect(
      result.anomalies.some(
        anomaly => anomaly.code === "INVALID_SUBCATEGORIES"
      )
    ).toBe(true);
  });

  it("should detect duplicate ids", () => {

    const structure = {
      id: 1,
      name: "Root",
      active: true,
      subcategories: [
        {
          id: 2,
          name: "A",
          active: true,
          subcategories: [],
        },
        {
          id: 2,
          name: "B",
          active: true,
          subcategories: [],
        },
      ],
    };

    const result = analyzeStructure(structure);

    expect(
      result.anomalies.some(
        anomaly => anomaly.code === "DUPLICATE_ID"
      )
    ).toBe(true);
  });

});