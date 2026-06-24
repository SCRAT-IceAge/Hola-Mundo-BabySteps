Markdown
# Instrucción de Contexto para la IA que procese este prompt:
El diseño del software es altamente modular. Para extender las capacidades de evaluación de este proyecto, solo se requiere codificar una nueva función analítica basada en los tipos de nodo de ts.SyntaxKind e insertarla en el array del método validateAst().

# IA-READY SUMMARY: Tester - React Native AST Evaluator

## 🎯 Propósito del Proyecto
**Tester** es una aplicación móvil (Expo/React Native) diseñada para la evaluación automatizada de código educativo (TSX/JSX). A diferencia de los validadores basados en expresiones regulares (Regex), este proyecto realiza un **análisis sintáctico profundo** mediante la comparación de Árboles de Sintaxis Abstracta (AST) para verificar que la estructura y los componentes del código de un estudiante cumplan con un estándar esperado.

## 🛠️ Stack Tecnológico Clave
- **Framework:** Expo SDK 56 + React Native 0.85.3 + React 19.2.3.
- **Lenguaje:** TypeScript (~6.0.3).
- **Core de Evaluación:** `TypeScript Compiler API` (utilizado para el parsing de código a AST y recolección de diagnósticos/errores de compilación en tiempo de ejecución).

## 🔄 Flujo de Trabajo y Arquitectura (Pipeline de Evaluación)
1. **Entrada de Usuario:** El estudiante escribe código en tiempo real en la pantalla `EvaluatorScreen.tsx`.
2. **Parsing & Transpilación (`parseUserCodeToSourceFile`):** - Transpila el string de código usando `ts.transpileModule` con configuración para preservar JSX (`ts.JsxEmit.Preserve`).
   - Genera un objeto `ts.SourceFile`. Si existen errores sintácticos o de compilación, detiene el flujo y retorna un estado de error visual.
3. **Validación Estructural (`validateAst`):**
   - Si el código es válido, se ejecutan funciones de análisis independientes que recorren el AST buscando nodos específicos (ej. usando un helper custom `findNodes<T>`).
4. **Feedback Reactivo (UX):** Se actualiza en vivo una lista de verificación visual (`ValidationResult[]`) con estados de éxito (✅) o fallo (❌).

## 🧪 Caso de Uso Implementado: "HolaMundo.tsx"
El proyecto cuenta con un entorno de pruebas inicializado para validar un componente estándar de React Native:
- **Código de Referencia:** Un componente funcional que importa `React`, `View` y `Text`, y renderiza el texto `"Hola Mundo"`.
- **Pipeline de Validación (6 Reglas Atómicas):**
  1. Presencia de `import React from 'react'`.
  2. Presencia de `import { View, Text } from 'react-native'`.
  3. Declaración correcta del componente (`const HolaMundo: React.FC = () =>`).
  4. Estructura JSX correcta (Un nodo `<View>` que anida a un nodo `<Text>`).
  5. Contenido textual exacto (Normalizado mediante `normalizeText` para ignorar espaciados espurios).
  6. Exportación por defecto (`export default HolaMundo`).

## 📁 Estructura del Repositorio (Puntos de Interés para la IA)
- `/scripts/generateAst.js`: Script Node.js offline que lee el componente ideal, genera su AST serializado y lo guarda en `/expected/`. Servirá como la "verdad de campo" (Ground Truth) para futuras comparaciones complejas.
- `/screens/EvaluatorScreen.tsx`: Contiene el núcleo de las funciones de validación AST (`checkImportReact`, `checkJsxStructure`, etc.).
- `/test/`: Contiene los archivos de código que sirven de plantilla para los estudiantes.

## 📊 Estado del Sistema
- **Capacidades Actuales:** Evaluación reactiva (on-the-fly), manejo de errores de parsing, checklist visual interactivo, soporte para modo oscuro.
- **Deuda Técnica / Roadmap:** Escalabilidad del sistema para soportar múltiples ejercicios (actualmente acoplado a 'HolaMundo'), implementación de sistema de scoring, persistencia de progreso del alumno y tests unitarios para los validadores sintácticos.