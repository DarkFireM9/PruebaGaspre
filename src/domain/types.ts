export interface Category {
  id: number;
  name: string;
  active: boolean;
  subcategories: Category[];
}

export interface CategorySearchResult {
  node: Category;
  path: string;
  depth: number;
  parentId: number | null;
  isLeaf: boolean;
}

export type AnomalyCode =
  | "INVALID_NODE"
  | "INVALID_ID"
  | "DUPLICATE_ID"
  | "INVALID_NAME"
  | "INVALID_SUBCATEGORIES"
  | "NULL_CHILD"
  | "CYCLE_DETECTED";

export interface Anomaly {
  code: AnomalyCode;
  id?: number;
  partialPath?: string;
  detail: string;
}

export interface AnalysisReport {
  activeLeafPaths: string[];
  totalValidNodes: number;
  activeCount: number;
  inactiveCount: number;
  maxDepth: number;
  anomalies: Anomaly[];
}