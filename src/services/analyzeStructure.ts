import {
  AnalysisReport,
  Anomaly,
} from "../domain/types";

export function analyzeStructure(root: unknown): AnalysisReport {
  const report: AnalysisReport = {
    activeLeafPaths: [],
    totalValidNodes: 0,
    activeCount: 0,
    inactiveCount: 0,
    maxDepth: 0,
    anomalies: [],
  };

  const visitedNodes = new WeakSet<object>();
  const seenIds = new Set<number>();

  function addAnomaly(
    anomaly: Anomaly
  ): void {
    report.anomalies.push(anomaly);
  }

  function dfs(
    node: unknown,
    path: string,
    depth: number,
    ancestorsActive: boolean
  ): void {

    if (node === null || node === undefined) {
      addAnomaly({
        code: "NULL_CHILD",
        partialPath: path,
        detail: "Child node is null or undefined",
      });

      return;
    }

    if (typeof node !== "object") {
      addAnomaly({
        code: "INVALID_NODE",
        partialPath: path,
        detail: "Node is not an object",
      });

      return;
    }

    if (visitedNodes.has(node)) {
      addAnomaly({
        code: "CYCLE_DETECTED",
        partialPath: path,
        detail: "Circular reference detected",
      });

      return;
    }

    visitedNodes.add(node);

    const raw = node as Record<string, unknown>;

    if (typeof raw.id !== "number") {
      addAnomaly({
        code: "INVALID_ID",
        partialPath: path,
        detail: "Invalid category id",
      });

      return;
    }

    if (seenIds.has(raw.id)) {
      addAnomaly({
        code: "DUPLICATE_ID",
        id: raw.id,
        partialPath: path,
        detail: "Duplicate category id detected",
      });
    } else {
      seenIds.add(raw.id);
    }

    if (
      typeof raw.name !== "string" ||
      raw.name.trim().length === 0
    ) {
      addAnomaly({
        code: "INVALID_NAME",
        id: raw.id,
        partialPath: path,
        detail: "Invalid category name",
      });

      return;
    }

    if (!Array.isArray(raw.subcategories)) {
      addAnomaly({
        code: "INVALID_SUBCATEGORIES",
        id: raw.id,
        partialPath: path,
        detail: "subcategories must be an array",
      });

      return;
    }

    const currentPath =
      path.length > 0
        ? `${path}/${raw.name.trim()}`
        : raw.name.trim();

    report.totalValidNodes++;

    const isActive = raw.active === true;

    if (isActive) {
      report.activeCount++;
    } else {
      report.inactiveCount++;
    }

    report.maxDepth = Math.max(
      report.maxDepth,
      depth
    );

    const branchActive =
      ancestorsActive && isActive;

    const isLeaf =
      raw.subcategories.length === 0;

    if (branchActive && isLeaf) {
      report.activeLeafPaths.push(currentPath);
    }

    for (const child of raw.subcategories) {
      dfs(
        child,
        currentPath,
        depth + 1,
        branchActive
      );
    }
  }

  dfs(root, "", 0, true);

  report.activeLeafPaths.sort();

  return report;
}