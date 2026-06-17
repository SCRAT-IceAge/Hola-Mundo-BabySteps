# Tester - React Native AST Evaluator

## Descripción General

**Tester** es una aplicación Expo + React Native + TypeScript que evalúa código de estudiantes mediante comparación de Árboles de Sintaxis Abstracta (AST). El objetivo es validar que el código ingresado por el usuario coincida con la estructura y componentes esperados, más allá de simples validaciones regex.

---

## Stack Tecnológico

- **Expo SDK 56**
- **React 19.2.3**
- **React Native 0.85.3**
- **TypeScript ~6.0.3**
- **TypeScript Compiler API** (para AST parsing)
- **React Navigation** (navegación entre pantallas)

---

## Estructura del Proyecto

```
Tester/
├── app.json                     # Configuración de Expo
├── App.tsx                      # Componente principal + navegación
├── navigation.ts                # Definición de rutas
├── index.ts                     # Entry point
├── package.json                 # Dependencias
├── tsconfig.json                # Configuración TypeScript
├── assets/                      # Recursos estáticos
├── screens/
│   ├── HomeScreen.tsx           # Pantalla de inicio
│   └── EvaluatorScreen.tsx      # Pantalla principal de evaluación AST
├── test/
│   └── HolaMundo.tsx            # Componente de referencia a validar
├── expected/
│   └── HolaMundoAst.ts          # AST esperado (generado offline)
├── scripts/
│   └── generateAst.js           # Script para generar AST desde archivos
└── React.md                     # Este archivo (documentación IA)
```

---

## Flujo de la Aplicación

### 1. **Inicio**
- `App.tsx` renderiza el navegador con dos pantallas
- `HomeScreen.tsx` muestra bienvenida e introducción
- `EvaluatorScreen.tsx` es donde ocurre la magia

### 2. **AST Evaluation in EvaluatorScreen**

```
User writes code
    ↓
parseUserCodeToSourceFile()
    ↓
Are there parse errors?
    ├─ YES → show "Invalid code"
    └─ NO → validateAst()
        ↓
    Run 6 independent validations:
    1. `import React from 'react'`
    2. `import { View, Text } from 'react-native'`
    3. `const HolaMundo: React.FC = () =>`
    4. Return JSX with `<View>` and `<Text>`
    5. Text inside `<Text>` is `Hola Mundo`
    6. `export default HolaMundo`
        ↓
    Show checklist with ✅/❌ for each step
```

---

## Componente de Referencia

**Archivo:** `test/HolaMundo.tsx`

```tsx
import React from 'react';
import { View, Text } from 'react-native';

const HolaMundo: React.FC = () => {
  return (
    <View>
      <Text>Hola Mundo</Text>
    </View>
  );
};

export default HolaMundo;
```

Este es el **código esperado** que los estudiantes deben replicar.

---

## AST Esperado

**Archivo:** `expected/HolaMundoAst.ts`

Contiene la estructura serializada del AST del componente de referencia. Se genera offline con:

```bash
node scripts/generateAst.js
```

**Propósito:** Servir como referencia para comparar el AST del código ingresado por el usuario.

---

## Validations in EvaluatorScreen.tsx

### Validation Functions

Each validation is **independent** and checks a specific code fragment.

| Step | Function | Expected code fragment |
|------|----------|------------------------|
| 1 | `checkImportReact()` | `import React from 'react';` |
| 2 | `checkImportViewText()` | `import { View, Text } from 'react-native';` |
| 3 | `checkComponentDeclaration()` | `const HolaMundo: React.FC = () => {` |
| 4 | `checkJsxStructure()` | `return (` with `<View>` and nested `<Text>` |
| 5 | `checkTextContent()` | `<Text>Hola Mundo</Text>` |
| 6 | `checkExportDefault()` | `export default HolaMundo;` |

### Result
`validateAst()` returns an array of `ValidationResult[]`:

```typescript
type ValidationResult = {
  id: number;
  label: string;
  passed: boolean;  // ✅ or ❌
};
```

---

## Parsing Flow

### 1. `parseUserCodeToSourceFile(code: string): ts.SourceFile | null`

```typescript
// Step 1: Create a SourceFile with TypeScript
const sourceFile = ts.createSourceFile(
  'UserCode.tsx',
  code,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX
);

// Step 2: Transpile and collect diagnostics
const transpile = ts.transpileModule(code, {
  fileName: 'UserCode.tsx',
  compilerOptions: {
    jsx: ts.JsxEmit.Preserve,
    target: ts.ScriptTarget.Latest,
    module: ts.ModuleKind.ESNext,
    allowJs: true,
    isolatedModules: true,
  },
  reportDiagnostics: true,
});

// Step 3: If there are compile errors, return null
const hasErrors = transpile.diagnostics?.some(
  (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
) ?? false;

if (hasErrors) return null;
return sourceFile;
```

---

## Helpers para Análisis AST

### `findNodes<T extends ts.Node>(node, kind): T[]`

Busca **todos** los nodos de un tipo específico en el árbol.

```typescript
// Ejemplo: buscar todos los ReturnStatement
const returnStatements = findNodes<ts.ReturnStatement>(
  body,
  ts.SyntaxKind.ReturnStatement
);
```

### `normalizeText(value?: string): string`

Normaliza espacios en blanco para comparaciones.

```typescript
normalizeText("  Hola   Mundo  ") // "Hola Mundo"
```

---

## Verifier Screen

**Component:** `Verificador`

Renders:

1. **Status message:**
   - Empty: "Type code to validate"
   - Error: "❌ Parse error: ..."
   - All passed: "✅ Checklist completed: all validations passed"
   - Partial: "❌ Check the remaining steps in the checklist"

2. **Visual checklist:**
   - Each validation appears as a row with ✅ or ❌
   - Includes the exact code fragment expected
   - Colors: green for pass, red for fail

---

## Cómo Agregar Nueva Validación

### Paso 1: Crear función de check

```typescript
const checkNuevaValidacion = (sourceFile: ts.SourceFile): boolean => {
  // Tu lógica aquí
  return true; // o false
};
```

### Paso 2: Agregarlo a `validateAst()`

```typescript
const validateAst = (sourceFile: ts.SourceFile): ValidationResult[] => {
  return [
    // ... validaciones existentes ...
    {
      id: 7,
      label: 'Tu nueva validación aquí',
      passed: checkNuevaValidacion(sourceFile),
    },
  ];
};
```

### Paso 3: Opcional - Agregar estilos si es necesario

En el objeto `styles` al final del archivo.

---

## Generación de AST Esperado

**Script:** `scripts/generateAst.js`

Uso:
```bash
node scripts/generateAst.js
```

Esto:
1. Lee `test/HolaMundo.tsx`
2. Parsea el código con TypeScript Compiler
3. Serializa el AST a JSON
4. Escribe el resultado en `expected/HolaMundoAst.ts`

---

## Tipos Principales

```typescript
type ValidationResult = {
  id: number;
  label: string;
  passed: boolean;
};

type ResultState = 'ok' | 'invalid' | 'parse-error' | null;
```

---

## Estado Actual de Implementación

✅ **Completado:**
- Estructura Expo + React Navigation
- Componente referencia `HolaMundo`
- AST esperado generado
- Parser AST con TypeScript Compiler
- 6 validaciones independientes
- Checklist visual interactivo
- Manejo de errores de parseo

⚠️ **Pendiente (futuro):**
- Más componentes para validar
- Sistema de puntuación
- Guardado de progreso del estudiante
- Más ejercicios/referencias

---

## Debugging

### El verificador siempre muestra "Escribe el código para validar"

**Causa:** El usuario no ha escrito nada o el TextInput no está funcionando.

**Solución:** Verificar que el `editorText` tenga contenido.

### Todas las validaciones fallan

**Causa:** El código no parsea correctamente.

**Solución:** Revisar la salida de `transpileModule()` en los diagnósticos.

### Una validación específica falla

**Causa:** La lógica de la validación no coincide con el código.

**Solución:** Debuggear el `SourceFile` con `console.log()` y verificar la estructura AST.

---

## Próximos Pasos Sugeridos

1. **Agregar más componentes** para validar (más allá de HolaMundo)
2. **Sistema de niveles** con dificultad progresiva
3. **Guardado de intentos** y estadísticas
4. **Explicaciones interactivas** de qué falla
5. **Tests unitarios** para las validaciones

---

## Contacto & Notas

- El proyecto usa **TypeScript Compiler API** en lugar de regex
- Las validaciones son **independientes** por diseño
- El AST se normaliza para ignorar espacios y textos vacíos
- El componente es **totalmente reactive** (rerenderiza al escribir)

Cualquier IA leyendo esto debe entender que el objetivo es **validar estructura de código mediante AST**, no mediante patrones de texto.
