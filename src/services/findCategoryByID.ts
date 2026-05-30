import { Category, CategorySearchResult } from "../domain/types";

export function findCategoryById(
  root: Category,
  targetId: number
): CategorySearchResult | null {

  function dfs(
    node: Category,
    path: string,
    depth: number,
    parentId: number | null
  ): CategorySearchResult | null {

    const currentPath = path
      ? `${path}/${node.name}`
      : node.name;

    if (node.id === targetId) {
      return {
        node,
        path: currentPath,
        depth,
        parentId,
        isLeaf: node.subcategories.length === 0
      };
    }

    for (const child of node.subcategories) {
      const result = dfs(
        child,
        currentPath,
        depth + 1,
        node.id
      );

      if (result) {
        return result;
      }
    }

    return null;
  }

  return dfs(root, "", 0, null);
}