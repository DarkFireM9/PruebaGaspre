import { findCategoryById } from "../src/services/findCategoryByID";
import { Category } from "../src/domain/types";

describe("findCategoryById", () => {
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

  it("should find a category by id and return its metadata", () => {
    const result = findCategoryById(structure, 5);

    expect(result).toEqual({
      node: {
        id: 5,
        name: "Laptops",
        active: true,
        subcategories: []
      },
      path: "Electrónica/Computadoras/Laptops",
      depth: 2,
      parentId: 2,
      isLeaf: true
    });
  });

  it("should return null when category does not exist", () => {
    const result = findCategoryById(structure, 999);

    expect(result).toBeNull();
  });
});