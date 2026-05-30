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

## Supuestos tomados

- La estructura principal es un árbol jerárquico de categorías con una única raíz.
- Los IDs de las categorías deberían ser únicos; los duplicados son reportados como anomalías durante el análisis.
- Una categoría hoja es aquella que no posee elementos en `subcategories`.
- Una hoja activa es aquella cuya categoría y toda su rama ascendente se encuentran activas.
- En la búsqueda por ID (`findCategoryById`), cuando el ID no existe se devuelve `null`.
- En la operación de movimiento (`moveCategory`) no se permite mover la raíz, mover un nodo sobre sí mismo ni moverlo dentro de uno de sus descendientes.
- La operación de movimiento es inmutable y no modifica la estructura original.

## Decisiones principales

### Uso de DFS (Depth First Search)

Todas las operaciones principales se implementaron mediante recorridos DFS, ya que permiten navegar estructuras jerárquicas de forma natural, construir rutas completas y mantener una complejidad lineal respecto al número de nodos.

### Validación defensiva en Fase 3

La función `analyzeStructure` fue diseñada para procesar estructuras potencialmente inválidas, detectando anomalías como:

- IDs duplicados
- referencias circulares
- nombres inválidos
- subcategorías mal formadas
- nodos nulos o inválidos

### Detección de ciclos

Se utiliza un `WeakSet` para registrar objetos visitados y evitar recorridos infinitos en caso de referencias circulares.

### Detección de IDs duplicados

Se utiliza un `Set<number>` para registrar los IDs encontrados durante el recorrido y reportar duplicados como anomalías.

### Inmutabilidad en Fase 4

La operación `moveCategory` trabaja sobre una copia de la estructura utilizando `structuredClone`, garantizando que el árbol original permanezca sin modificaciones.

## Complejidad y árboles profundos

### Fase 3 – analyzeStructure

**Complejidad temporal:** `O(n)`

La estructura se recorre una sola vez mediante DFS. Durante ese recorrido se calculan estadísticas, se generan rutas activas y se detectan anomalías.

**Complejidad espacial:** `O(n)`

Se utilizan estructuras auxiliares como `Set` y `WeakSet` para detectar IDs duplicados y ciclos.

**Árboles profundos:**

La implementación utiliza DFS recursivo por simplicidad y claridad. Para estructuras extremadamente profundas podría reemplazarse por una implementación iterativa basada en una pila explícita.

### Fase 4 – moveCategory

**Complejidad temporal:** `O(n)`

La operación requiere localizar nodos, validar restricciones y actualizar la estructura mediante recorridos lineales.

**Complejidad espacial:** `O(n)`

Se realiza una copia completa del árbol para mantener la inmutabilidad.

**Árboles profundos:**

Los recorridos utilizan DFS recursivo. En escenarios con profundidades muy elevadas podría adoptarse una implementación iterativa para reducir el riesgo de desbordamiento de pila.
