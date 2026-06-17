export const expectedHolaMundoAst = {
  "kind": "SourceFile",
  "children": [
    {
      "kind": "ImportDeclaration",
      "children": [
        {
          "kind": "ImportClause",
          "children": [
            {
              "kind": "Identifier",
              "text": "React"
            }
          ]
        },
        {
          "kind": "StringLiteral",
          "text": "react"
        }
      ]
    },
    {
      "kind": "ImportDeclaration",
      "children": [
        {
          "kind": "ImportClause",
          "children": [
            {
              "kind": "NamedImports",
              "children": [
                {
                  "kind": "ImportSpecifier",
                  "children": [
                    {
                      "kind": "Identifier",
                      "text": "View"
                    }
                  ]
                },
                {
                  "kind": "ImportSpecifier",
                  "children": [
                    {
                      "kind": "Identifier",
                      "text": "Text"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "kind": "StringLiteral",
          "text": "react-native"
        }
      ]
    },
    {
      "kind": "FirstStatement",
      "children": [
        {
          "kind": "VariableDeclarationList",
          "children": [
            {
              "kind": "VariableDeclaration",
              "children": [
                {
                  "kind": "Identifier",
                  "text": "HolaMundo"
                },
                {
                  "kind": "TypeReference",
                  "children": [
                    {
                      "kind": "FirstNode",
                      "children": [
                        {
                          "kind": "Identifier",
                          "text": "React"
                        },
                        {
                          "kind": "Identifier",
                          "text": "FC"
                        }
                      ]
                    }
                  ]
                },
                {
                  "kind": "ArrowFunction",
                  "children": [
                    {
                      "kind": "EqualsGreaterThanToken"
                    },
                    {
                      "kind": "Block",
                      "children": [
                        {
                          "kind": "ReturnStatement",
                          "children": [
                            {
                              "kind": "ParenthesizedExpression",
                              "children": [
                                {
                                  "kind": "JsxElement",
                                  "children": [
                                    {
                                      "kind": "JsxOpeningElement",
                                      "children": [
                                        {
                                          "kind": "Identifier",
                                          "text": "View"
                                        },
                                        {
                                          "kind": "JsxAttributes"
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "JsxText",
                                      "text": "\r\n      "
                                    },
                                    {
                                      "kind": "JsxElement",
                                      "children": [
                                        {
                                          "kind": "JsxOpeningElement",
                                          "children": [
                                            {
                                              "kind": "Identifier",
                                              "text": "Text"
                                            },
                                            {
                                              "kind": "JsxAttributes"
                                            }
                                          ]
                                        },
                                        {
                                          "kind": "JsxText",
                                          "text": "Hola Mundo"
                                        },
                                        {
                                          "kind": "JsxClosingElement",
                                          "children": [
                                            {
                                              "kind": "Identifier",
                                              "text": "Text"
                                            }
                                          ]
                                        }
                                      ]
                                    },
                                    {
                                      "kind": "JsxText",
                                      "text": "\r\n    "
                                    },
                                    {
                                      "kind": "JsxClosingElement",
                                      "children": [
                                        {
                                          "kind": "Identifier",
                                          "text": "View"
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "ExportAssignment",
      "children": [
        {
          "kind": "Identifier",
          "text": "HolaMundo"
        }
      ]
    },
    {
      "kind": "EndOfFileToken"
    }
  ]
} as const;
