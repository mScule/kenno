enum ASTNodeType {
    Expression = "Expression",
    Or = "Or",
    And = "And",
    Equality = "Equality",
    Relational = "Relational",
    Additive = "Additive",
    Multiclative = "Multiclative",
    Unary = "Unary",
    Primary = "Primary",
    FunctionCall = "FunctionCall",
    Reference = "Reference",
    Pointer = "Pointer",
    List = "List",
    Range = "Range",
    Array = "Array",
    Literal = "Literal"
}

export default ASTNodeType;
