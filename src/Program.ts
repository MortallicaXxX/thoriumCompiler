import { RepertoryTree as repertorytree } from "./Repertory";
import { Structure as structure } from "./Structure";

/**
  @Description : Compilateur thorium
*/
export class Program{

  /** @localPath {type string} Contient la chaine de string representant le chemin d appel du script */
  localPath:string = process.env.PWD;
  repertoryTree:repertorytree = new repertorytree(this.localPath);

  constructor(){
    const isValid:boolean = new structure().isValidStructureTree(this.repertoryTree);
  }

}
