// babel tokTypes necessary for traversing ast
export const tokTypes = {
    "num": {
        "label": "num",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "bigint": {
        "label": "bigint",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "regexp": {
        "label": "regexp",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "string": {
        "label": "string",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "name": {
        "label": "name",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "eof": {
        "label": "eof",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "bracketL": {
        "label": "[",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "bracketR": {
        "label": "]",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "braceL": {
        "label": "{",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "braceBarL": {
        "label": "{|",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "braceR": {
        "label": "}",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "braceBarR": {
        "label": "|}",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "parenL": {
        "label": "(",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "parenR": {
        "label": ")",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "comma": {
        "label": ",",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "semi": {
        "label": ";",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "colon": {
        "label": ":",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "doubleColon": {
        "label": "::",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "dot": {
        "label": ".",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "question": {
        "label": "?",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "questionDot": {
        "label": "?.",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "arrow": {
        "label": "=>",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "template": {
        "label": "template",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "ellipsis": {
        "label": "...",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "backQuote": {
        "label": "`",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "dollarBraceL": {
        "label": "${",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "at": {
        "label": "@",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "hash": {
        "label": "#",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "interpreterDirective": {
        "label": "#!...",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "eq": {
        "label": "=",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": true,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "assign": {
        "label": "_=",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": true,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "incDec": {
        "label": "++/--",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": true,
        "binop": null
    },
    "bang": {
        "label": "!",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "tilde": {
        "label": "~",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "pipeline": {
        "label": "|>",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 0,
        "updateContext": null
    },
    "nullishCoalescing": {
        "label": "??",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 1,
        "updateContext": null
    },
    "logicalOR": {
        "label": "||",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 1,
        "updateContext": null
    },
    "logicalAND": {
        "label": "&&",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 2,
        "updateContext": null
    },
    "bitwiseOR": {
        "label": "|",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 3,
        "updateContext": null
    },
    "bitwiseXOR": {
        "label": "^",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 4,
        "updateContext": null
    },
    "bitwiseAND": {
        "label": "&",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 5,
        "updateContext": null
    },
    "equality": {
        "label": "==/!=",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 6,
        "updateContext": null
    },
    "relational": {
        "label": "</>",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 7,
        "updateContext": null
    },
    "bitShift": {
        "label": "<</>>",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 8,
        "updateContext": null
    },
    "plusMin": {
        "label": "+/-",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": false,
        "binop": 9,
        "updateContext": null
    },
    "modulo": {
        "label": "%",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 10,
        "updateContext": null
    },
    "star": {
        "label": "*",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 10,
        "updateContext": null
    },
    "slash": {
        "label": "/",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 10,
        "updateContext": null
    },
    "exponent": {
        "label": "**",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": true,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 11,
        "updateContext": null
    },
    "_break": {
        "label": "break",
        "keyword": "break",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_case": {
        "label": "case",
        "keyword": "case",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_catch": {
        "label": "catch",
        "keyword": "catch",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_continue": {
        "label": "continue",
        "keyword": "continue",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_debugger": {
        "label": "debugger",
        "keyword": "debugger",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_default": {
        "label": "default",
        "keyword": "default",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_do": {
        "label": "do",
        "keyword": "do",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": true,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_else": {
        "label": "else",
        "keyword": "else",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_finally": {
        "label": "finally",
        "keyword": "finally",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_for": {
        "label": "for",
        "keyword": "for",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": true,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_function": {
        "label": "function",
        "keyword": "function",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "_if": {
        "label": "if",
        "keyword": "if",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_return": {
        "label": "return",
        "keyword": "return",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_switch": {
        "label": "switch",
        "keyword": "switch",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_throw": {
        "label": "throw",
        "keyword": "throw",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_try": {
        "label": "try",
        "keyword": "try",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_var": {
        "label": "var",
        "keyword": "var",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_let": {
        "label": "let",
        "keyword": "let",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_const": {
        "label": "const",
        "keyword": "const",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_while": {
        "label": "while",
        "keyword": "while",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": true,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_with": {
        "label": "with",
        "keyword": "with",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_new": {
        "label": "new",
        "keyword": "new",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_this": {
        "label": "this",
        "keyword": "this",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_super": {
        "label": "super",
        "keyword": "super",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_class": {
        "label": "class",
        "keyword": "class",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_extends": {
        "label": "extends",
        "keyword": "extends",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_export": {
        "label": "export",
        "keyword": "export",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_import": {
        "label": "import",
        "keyword": "import",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_yield": {
        "label": "yield",
        "keyword": "yield",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_null": {
        "label": "null",
        "keyword": "null",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_true": {
        "label": "true",
        "keyword": "true",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_false": {
        "label": "false",
        "keyword": "false",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_in": {
        "label": "in",
        "keyword": "in",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 7,
        "updateContext": null
    },
    "_instanceof": {
        "label": "instanceof",
        "keyword": "instanceof",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": 7,
        "updateContext": null
    },
    "_typeof": {
        "label": "typeof",
        "keyword": "typeof",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_void": {
        "label": "void",
        "keyword": "void",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "_delete": {
        "label": "delete",
        "keyword": "delete",
        "beforeExpr": true,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": true,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "jsxName": {
        "label": "jsxName",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "jsxText": {
        "label": "jsxText",
        "beforeExpr": true,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null,
        "updateContext": null
    },
    "jsxTagStart": {
        "label": "jsxTagStart",
        "beforeExpr": false,
        "startsExpr": true,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    },
    "jsxTagEnd": {
        "label": "jsxTagEnd",
        "beforeExpr": false,
        "startsExpr": false,
        "rightAssociative": false,
        "isLoop": false,
        "isAssign": false,
        "prefix": false,
        "postfix": false,
        "binop": null
    }
}
