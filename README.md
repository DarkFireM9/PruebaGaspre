# PruebaGaspre

Solucion a la prueba tecnica de Gaspre de dominio jerarquico de categorias.

---

## Requisitos

- Node.js ≥ 18
- npm ≥ 9

## Instalación

```bash
npm install
```

## Ejecución de tests

```bash
npm test
# con coverage
npm run test:coverage
```

## Fases completadas

| Fase | Operación            | Descripción                                             |
| ---- | -------------------- | ------------------------------------------------------- |
| 1    | `getActiveLeafPaths` | Rutas de hojas activas, ordenadas alfabéticamente       |
| 2    | `findCategoryById`   | Búsqueda por id con path, profundidad, parentId, isLeaf |
| 3    | `analyzeStructure`   | Análisis completo con detección de anomalías            |
| 4    | `moveCategory`       | Mover nodo a nuevo padre, operación inmutable           |

## Estructura del proyecto

```
PruebaGaspre
│
├── src
│   ├── domain
│   │   └── types.ts
│   │
│   ├── services
│   │   ├── getActiveLeafPaths.ts
│   │   ├── findCategoryById.ts
│   │   ├── analyzeStructure.ts
│   │   └── moveCategory.ts
│   │
│   └── index.ts
│
├── tests
│   ├── getActiveLeafPaths.test.ts
│   ├── findCategoryById.test.ts
│   ├── analyzeStructure.test.ts
│   └── moveCategory.test.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── jest.config.json
├── README.md
├── AI_USAGE.md
└── .gitignore

```
