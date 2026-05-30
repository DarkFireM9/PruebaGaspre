import { Category } from "../domain/types";
import { findCategoryById } from "./findCategoryByID";

export function moveCategory(
  root: Category,
  categoryId: number,
  newParentId: number
): Category {

  if (root.id === categoryId) {
    throw new Error("Cannot move root node");
  }

  const nodeToMove = findCategoryById(
    root,
    categoryId
  );

  if (!nodeToMove) {
    throw new Error("Category not found");
  }

  const newParent = findCategoryById(
    root,
    newParentId
  );

  if (!newParent) {
    throw new Error("Target parent not found");
  }

  const descendants = new Set<number>();

  function collectDescendants(
    node: Category
  ): void {

    descendants.add(node.id);

    for (const child of node.subcategories) {
      collectDescendants(child);
    }
  }

  collectDescendants(nodeToMove.node);

  if (descendants.has(newParentId)) {
    throw new Error(
      "Cannot move a node inside itself or its descendants"
    );
  }

  const clonedRoot = structuredClone(root);

  let extractedNode: Category | null = null;

  function removeNode(
    node: Category
  ): void {

    node.subcategories =
      node.subcategories.filter(child => {

        if (child.id === categoryId) {
          extractedNode = child;
          return false;
        }

        removeNode(child);

        return true;
      });
  }

  removeNode(clonedRoot);

  if (!extractedNode) {
    throw new Error(
      "Failed to extract node"
    );
  }

  function insertNode(
    node: Category
  ): boolean {

    if (node.id === newParentId) {
      node.subcategories.push(
        extractedNode as Category
      );

      return true;
    }

    for (const child of node.subcategories) {
      if (insertNode(child)) {
        return true;
      }
    }

    return false;
  }

  insertNode(clonedRoot);

  return clonedRoot;
}