import { Category } from "../domain/types";

export function getActiveLeafPaths(root: Category): string[] {
  const paths: string[] = [];

  function traverse(
    node: Category,
    currentPath: string,
    ancestorsActive: boolean
  ): void {
    const branchActive = ancestorsActive && node.active;

    if (!branchActive) {
      return;
    }

    const newPath = currentPath
       ? `${currentPath}/${node.name}`
       : node.name;

    const isLeaf = node.subcategories.length === 0;

    if (isLeaf) {
      paths.push(newPath);
      return;
    }

    for (const child of node.subcategories) {
      traverse(child, newPath, branchActive);
    }
  }

  traverse(root, "", true);

  return paths.sort();
}

//Use DFS Recursivo porque Cada nodo se visita exactamente una vez y es fácil de implementar para árboles.
// Complejidad temporal: O(n)
// Complejidad espacial: O(h) donde h es la profundidad del árbol por la pila de recursión.
// Para árboles extremadamente profundos podría migrarse a una implementación iterativa con una pila explícita.
