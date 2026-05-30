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

## Estructura del proyecto

```
src/
  domain/
```
