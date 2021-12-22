import * as Fs from "fs";
import * as Path from "path";
import { Folder , File } from "./Models";

/** @{Description} Class representant le repertory tree en objet du path renseigner */
export class RepertoryTree extends Folder{

  baseName:string;
  localPath:string;
  fullPath:string;
  files:File[];
  folders:Folder[];

  constructor(fullPath:string){
    super();
    console.log(fullPath);
    this.fullPath = this.#__normalize_path(fullPath);
    this.baseName = this.BaseName(fullPath);
    this.localPath = this.baseName;
    this.#__map_folder(this.fullPath,this);
  }

  BaseName(fullPath:string):string{
    return fullPath.split("/")[fullPath.split("/").length - 1];
  }

  Disk(PWDPath:string):string{
    return `${PWDPath.split("/").filter((x:string,i:number)=>x)[0].toUpperCase()}:`;
  }

  #__normalize_path = function(PWDPath:string):string{
    let fullSplitPath:string[] = PWDPath.split("/").filter((x:string,i:number)=>x);
    if(!fullSplitPath[0].includes(":"))fullSplitPath[0] = this.Disk(PWDPath);
    return fullSplitPath.join("/");
  }

  #__map_folder = function(path:string,target:Folder){
    // console.log(path);
    const _this:RepertoryTree = this;
    const mapResult:string[] = this.#__read_dir(path);

    target.folders = Array.from(mapResult,function(dir:any|Fs.Dirent , i:null):Folder{
      if(dir.isDirectory()){
        const folder = new Folder;
        folder.baseName = dir.name;
        folder.localPath = `${_this.localPath}/${dir.name}`;
        folder.fullPath = `${path}/${dir.name}`;
        folder.files = [];
        folder.folders = [];
        _this.#__map_folder(`${path}/${dir.name}`,folder);
        return folder;
      }
    }).filter((x,i) => x);

    target.files = Array.from(mapResult,function(dir:any|Fs.Dirent , i:null):File|null{
      if(!dir.isDirectory()){
        const files:File = {
          baseName : dir.name,
          localPath : `${_this.localPath}/${dir.name}`,
          fullPath : `${path}/${dir.name}`,
          extention : Path.extname(dir.name)
        };
        return files;
      }
    }).filter((x,i) => x);

  }

  #__read_dir = function(path:string){
    return Fs.readdirSync(path,{ withFileTypes: true });
  }

}
