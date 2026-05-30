import { getActiveLeafPaths } from "../src/services/getActiveLeafPaths";
import { Category } from "../src/domain/types";

describe("getActiveLeafPaths", () => {
  it("should return active leaf paths sorted alphabetically", () => {
    const structure: Category = {
      id: 1,
      name: "Electrónica",
      active: true,
      subcategories: [
        {
          id: 2,
          name: "Computadoras",
          active: true,
          subcategories: [
            {
              id: 5,
              name: "Laptops",
              active: true,
              subcategories: []
            },
            {
              id: 6,
              name: "Desktops",
              active: false,
              subcategories: []
            }
          ]
        },
        {
          id: 3,
          name: "Celulares",
          active: true,
          subcategories: []
        },
        {
          id: 4,
          name: "Accesorios",
          active: true,
          subcategories: []
        }
      ]
    };

    expect(getActiveLeafPaths(structure)).toEqual([
      "Electrónica/Accesorios",
      "Electrónica/Celulares",
      "Electrónica/Computadoras/Laptops"
    ]);
  });
});