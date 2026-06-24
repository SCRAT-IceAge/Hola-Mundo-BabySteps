import { useState } from 'react';
import { ScrollView, Text, TextInput, View, Switch } from 'react-native';
import * as ts from 'typescript';

// Importaciones modularizadas
import { ValidationResult } from './EvaluatorTypes';
import { styles } from './EvaluatorStyles';

const normalizeText = (value?: string): string => value?.replace(/\s+/g, ' ').trim() ?? '';

const findNodes = <T extends ts.Node>(node: ts.Node, kind: ts.SyntaxKind): T[] => {
  const results: T[] = [];
  const visit = (current: ts.Node) => {
    if (current.kind === kind) {
      results.push(current as T);
    }
    current.forEachChild(visit);
  };
  visit(node);
  return results;
};

const checkImportReact = (sourceFile: ts.SourceFile): boolean => {
  return sourceFile.statements.some((statement) => {
    if (!ts.isImportDeclaration(statement)) return false;
    const moduleName = statement.moduleSpecifier;
    if (!ts.isStringLiteral(moduleName) || moduleName.text !== 'react') return false;
    const clause = statement.importClause;
    return clause?.name?.text === 'React';
  });
};

const checkImportViewText = (sourceFile: ts.SourceFile): boolean => {
  return sourceFile.statements.some((statement) => {
    if (!ts.isImportDeclaration(statement)) return false;
    const moduleName = statement.moduleSpecifier;
    if (!ts.isStringLiteral(moduleName) || moduleName.text !== 'react-native') return false;
    const namedBindings = statement.importClause?.namedBindings;
    if (!namedBindings || !ts.isNamedImports(namedBindings)) return false;

    const imported = namedBindings.elements.map((element) => element.name.text);
    return imported.includes('View') && imported.includes('Text');
  });
};

const checkComponentDeclaration = (sourceFile: ts.SourceFile): boolean => {
  return sourceFile.statements.some((statement) => {
    if (!ts.isVariableStatement(statement)) return false;
    const declaration = statement.declarationList.declarations[0];
    if (!declaration || !ts.isIdentifier(declaration.name) || declaration.name.text !== 'HolaMundo') return false;
    const type = declaration.type;
    const initializer = declaration.initializer;
    const hasReactFc = type !== undefined
      && ts.isTypeReferenceNode(type)
      && ts.isQualifiedName(type.typeName)
      && ts.isIdentifier(type.typeName.left)
      && type.typeName.left.text === 'React'
      && ts.isIdentifier(type.typeName.right)
      && type.typeName.right.text === 'FC';
    const hasArrowFunction = initializer ? ts.isArrowFunction(initializer) : false;
    return hasReactFc && hasArrowFunction;
  });
};

const checkJsxStructure = (sourceFile: ts.SourceFile): boolean => {
  const variableStatement = sourceFile.statements.find(ts.isVariableStatement);
  const declaration = variableStatement?.declarationList.declarations[0];
  if (!declaration || !declaration.initializer || !ts.isArrowFunction(declaration.initializer)) return false;

  const body = declaration.initializer.body;
  const returnStatement = findNodes<ts.ReturnStatement>(body, ts.SyntaxKind.ReturnStatement)[0];
  if (!returnStatement || !returnStatement.expression) return false;

  const jsxRoot = ts.isParenthesizedExpression(returnStatement.expression)
    ? returnStatement.expression.expression
    : returnStatement.expression;

  if (!ts.isJsxElement(jsxRoot)) return false;
  const openingTag = jsxRoot.openingElement.tagName;
  if (!ts.isIdentifier(openingTag) || openingTag.text !== 'View') return false;

  const textElement = findNodes<ts.JsxElement>(jsxRoot, ts.SyntaxKind.JsxElement).find((element) => {
    const tag = element.openingElement.tagName;
    return ts.isIdentifier(tag) && tag.text === 'Text';
  });

  return Boolean(textElement);
};

const checkTextContent = (sourceFile: ts.SourceFile): boolean => {
  const jsxTextNodes = findNodes<ts.JsxText>(sourceFile, ts.SyntaxKind.JsxText);
  return jsxTextNodes.some((textNode) => normalizeText(textNode.getText()) === 'Hola Mundo');
};

const checkExportDefault = (sourceFile: ts.SourceFile): boolean => {
  return sourceFile.statements.some((statement) => {
    if (!ts.isExportAssignment(statement)) return false;
    return ts.isIdentifier(statement.expression) && statement.expression.text === 'HolaMundo';
  });
};

const validateAst = (sourceFile: ts.SourceFile): ValidationResult[] => {
  return [
    { id: 1, label: 'Importar React desde "react"', passed: checkImportReact(sourceFile) },
    { id: 2, label: 'Importar { View, Text } desde "react-native"', passed: checkImportViewText(sourceFile) },
    { id: 3, label: 'Declarar const HolaMundo: React.FC = () =>', passed: checkComponentDeclaration(sourceFile) },
    { id: 4, label: 'Retornar JSX con <View> y <Text>', passed: checkJsxStructure(sourceFile) },
    { id: 5, label: 'El texto dentro de <Text> es "Hola Mundo"', passed: checkTextContent(sourceFile) },
    { id: 6, label: 'Exportar por defecto HolaMundo', passed: checkExportDefault(sourceFile) },
  ];
};

const parseUserCodeToSourceFile = (code: string): ts.SourceFile | null => {
  const sourceFile = ts.createSourceFile(
    'UserCode.tsx',
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

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

  const hasErrors = transpile.diagnostics?.some((diagnostic: ts.Diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error) ?? false;
  if (hasErrors) {
    return null;
  }

  return sourceFile;
};

function Editor({
  text,
  onChangeText,
  darkMode,
  onDarkModeToggle,
}: {
  text: string;
  onChangeText: (value: string) => void;
  darkMode: boolean;
  onDarkModeToggle: (value: boolean) => void;
}) {
  return (
    <View style={[styles.card, darkMode ? styles.cardDark : styles.cardLight]}>
      <View style={styles.editorHeader}>
        <Text style={[styles.cardTitle, darkMode ? styles.textDark : styles.textLight]}>
          Editor
        </Text>
        <View style={styles.toggleContainer}>
          <Text style={[styles.toggleLabel, darkMode ? styles.textDark : styles.textLight]}>
            🌙
          </Text>
          <Switch
            value={darkMode}
            onValueChange={onDarkModeToggle}
            trackColor={{ false: '#cbd5e1', true: '#475569' }}
            thumbColor={darkMode ? '#f59e0b' : '#ffffff'}
          />
        </View>
      </View>
      <TextInput
        style={[
          styles.textArea,
          darkMode ? styles.textAreaDark : styles.textAreaLight,
        ]}
        multiline
        placeholder="Escribe aquí tu código..."
        placeholderTextColor={darkMode ? '#9ca3af' : '#6b7280'}
        value={text}
        onChangeText={onChangeText}
      />
    </View>
  );
}

function Verificador({ results, error }: { results: ValidationResult[]; error: string | null }) {
  const allPassed = results.every((item) => item.passed);
  let message = 'Escribe el código para validar';
  if (error) {
    message = `❌ Error de parseo: ${error}`;
  } else if (results.length > 0) {
    message = allPassed
      ? '✅ Checklist completada: todas las validaciones pasaron'
      : '❌ Revisa los pasos que faltan en la checklist';
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Verificador</Text>
      <Text style={[styles.resultText, allPassed ? styles.statusPass : styles.statusFail]}>{message}</Text>
      <View style={styles.validationList}>
        {results.map((result) => (
          <View key={result.id} style={styles.validationRow}>
            <Text style={[styles.validationIcon, result.passed ? styles.iconPass : styles.iconFail]}>
              {result.passed ? '✅' : '❌'}
            </Text>
            <Text style={styles.validationLabel}>{result.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function EvaluatorScreen() {
  const [editorText, setEditorText] = useState('');
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const verifyInput = (value: string) => {
    if (!value.trim()) {
      setValidationResults([]);
      setParseError(null);
      return;
    }

    const sourceFile = parseUserCodeToSourceFile(value);
    if (!sourceFile) {
      setValidationResults([]);
      setParseError('Código inválido o incompleto');
      return;
    }

    const results = validateAst(sourceFile);
    setParseError(null);
    setValidationResults(results);
  };

  const handleChangeText = (value: string) => {
    setEditorText(value);
    verifyInput(value);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        darkMode ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Text style={[styles.title, darkMode ? styles.textDark : styles.textLight]}>
        Pantalla Evaluador
      </Text>
      <Editor
        text={editorText}
        onChangeText={handleChangeText}
        darkMode={darkMode}
        onDarkModeToggle={setDarkMode}
      />
      <Verificador results={validationResults} error={parseError} />
    </ScrollView>
  );
}