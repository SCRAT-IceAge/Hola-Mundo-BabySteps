const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function serializeNode(node) {
  const result = { kind: ts.SyntaxKind[node.kind] };

  if (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node) || ts.isJsxText(node)) {
    result.text = node.text;
  }

  if (ts.isPropertyAccessExpression(node)) {
    result.expression = ts.SyntaxKind[node.expression.kind];
    result.name = node.name.text;
  }

  if (ts.isLiteralExpression(node) && !result.text) {
    result.text = node.getText();
  }

  const children = [];
  node.forEachChild((child) => {
    children.push(serializeNode(child));
  });

  if (children.length > 0) {
    result.children = children;
  }

  return result;
}

function generateAst(filePath) {
  const absolutePath = path.resolve(filePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const sourceFile = ts.createSourceFile(absolutePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  return serializeNode(sourceFile);
}

function main() {
  const [,, inputPath] = process.argv;
  if (!inputPath) {
    console.error('Usage: node scripts/generateAst.js <source-file>');
    process.exit(1);
  }

  const ast = generateAst(inputPath);
  const outputDir = path.join(__dirname, '..', 'expected');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'HolaMundoAst.ts');
  const fileContent = `export const expectedHolaMundoAst = ${JSON.stringify(ast, null, 2)} as const;\n`;

  fs.writeFileSync(outputPath, fileContent, 'utf8');
  console.log('Generated AST file at', outputPath);
}

main();
