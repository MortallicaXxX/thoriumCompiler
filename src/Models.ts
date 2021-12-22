/** @{Description} Interface representant un Fichier */
export class File{
  /** nom du fichier sans son extention  */
  baseName:string;
  /** path du fichier par rapport au root folder  */
  localPath:string;
  /** full path du fichier  */
  fullPath:string;
  /** extention du fichier  */
  extention:string;
}

/** @{Description} Interface representant un folder */
export class Folder{
  /** nom du repertoire */
  baseName:string;
  /** local path du folder en fonction de la racine du root folder  */
  localPath:string;
  /** full path du folder  */
  fullPath:string;
  /** contient les sous-fichiers du folder  */
  files:File[];
  /** contient les sous-folder du folder  */
  folders:Folder[];

  findDir(){

  }

  isDir(dirName:string):boolean{
    return Array.from(this.folders,function(x:any|Folder,i:null){
      if(x.baseName == dirName)return true;
      else return false;
    }).includes(true);
  }

  getDir(dirName:string):Folder{
    for(const folder of this.folders){
      if(folder.baseName == dirName)return folder;
    }
  }

  findFile(){

  }

  isFile(fileName:string):any{
    return Array.from(this.files,function(x:any|Folder,i:null){
      if(x.baseName == fileName)return true;
      else return false;
    }).includes(true);
  }

  getFile(fileName:string):File{
    for(const file of this.files){
      if(file.baseName == fileName)return file;
    }
  }

}
