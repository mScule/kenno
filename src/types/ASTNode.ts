import ASTNodeType from "./ASTNodeType";
import Token from "./Token";

type ASTNode = {
  type: ASTNodeType;
  token?: Token;
  children?: ASTNode[];
};

export default ASTNode;
