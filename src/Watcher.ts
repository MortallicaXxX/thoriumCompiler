import * as fs from "fs";

export class Watcher{

  #watcher:fs.FSWatcher;
  #pathToWatch:string;

  get watcher():fs.FSWatcher{return this.#watcher}
  get pathToWatch():string{return this.#pathToWatch}
  get onChange():string{return this.#onChange.toString()}

  constructor(pathToWatch:string){
    this.#pathToWatch = pathToWatch;
  }

  Start(){
    this.#watcher = fs.watch(this.#pathToWatch, this.#onChange);
  }

  Stop(){
    fs.unwatchFile(this.#pathToWatch);
  }

  #onChange = function(eventType, filename){
    console.log("\nThe file", filename, "was modified!");
    console.log("The type of change was:", eventType);
  }

}
