import { moveCategory } from "../src/services/moveCategory";
import { Category } from "../src/domain/types";

describe("moveCategory", () => {

  it("should move a category to another parent", () => {

    const tree: Category = {
      id: 1,
      name: "Root",
      active: true,
      subcategories: [
        {
          id: 2,
          name: "Computadoras",
          active: true,
          subcategories: [],
        },
        {
          id: 3,
          name: "Celulares",
          active: true,
          subcategories: [],
        },
      ],
    };

    const result =
      moveCategory(tree, 3, 2);

    expect(
      result.subcategories[0]
        .subcategories[0].id
    ).toBe(3);
  });

});