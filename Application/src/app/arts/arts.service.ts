import { Art } from './art.model'
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ArtsService {
  private arts: Art[] = [];
  private artsUpdated = new Subject<Art[]>();

  getArts(){
    return [...this.arts];
  }

  getArtUpdateListener() {
    return this.artsUpdated.asObservable();
  }

  addArt(art: Art) {
    this.arts.push(art)
    this.artsUpdated.next([...this.arts])
  }
}
