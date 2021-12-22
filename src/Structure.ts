import { File , Folder } from "./Models";

export class Structure{

  isValidStructureTree(folder:Folder){
    console.log(`Comparaison between project repertory tree and thorium repertory tree type.`);
    const result:boolean[] = [this.isValidViewer(folder),this.isValidComponents(folder)];
    if([this.isValidViewer(folder),this.isValidComponents(folder)].includes(false))this.onUnvalidStructureTree(folder);
    return ![this.isValidViewer(folder),this.isValidComponents(folder)].includes(false);
  }

  isValidViewer(folder:Folder):boolean{
    return folder.isDir("views");
  }

  isValidComponents(folder:Folder):boolean{
    return folder.isDir("views/components/models");
  }

  onUnvalidStructureTree(folder:Folder){
    console.log(`It seems you didn't repect hierarchy for your project.`);
    if(!this.isValidViewer(folder))console.log(`It seems you didn't repect hierarchy for viewer. projectFolder/views`);
    if(!this.isValidComponents(folder))console.log(`It seems you didn't repect hierarchy for components. projectFolder/views/components/models`);
  }

}
