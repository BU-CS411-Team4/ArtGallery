import {Art} from './art.model'
import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http'
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class ArtsService {
  private arts: Art[] = [];
  private artsUpdated = new Subject<Art[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getArts(){
    this.http
      .get<{ message: string; arts: any }>(
        'http://localhost:3000/api/arts'
      )
      .pipe(map((artData) => {
        // @ts-ignore
        return artData.arts.map(art => {
          return {
            keyword: art.keyword,
            id: art._id,
            imagePath: art.imagePath,
            audioPath: art.audioPath
          }
        });
      }))
      .subscribe((transformedArts) => {
        this.arts = transformedArts;
        this.artsUpdated.next([...this.arts]);
      });
  }

  getArtUpdateListener() {
    return this.artsUpdated.asObservable();
  }

  // @ts-ignore
  generateArt(keyword:string){
    return this.http.post('http://localhost:3000/api/generate/', { keyword: keyword }, {
      responseType: 'json'
    });
  }

  addArt(output:any){
    this.http.post<{message:string, art: Art}>('http://localhost:3000/api/arts', {output})
      .subscribe((responseData) => {
        const art: Art = {
          id: responseData.art.id,
          keyword: responseData.art.keyword,
          imagePath: responseData.art.imagePath,
          audioPath: responseData.art.audioPath}
        this.arts.push(art);
        this.artsUpdated.next([...this.arts]);

        this.router.navigate([''])
      });
  }

  deleteArt(artId: string){
    this.http.delete("http://localhost:3000/api/arts/" + artId)
      .subscribe(() => {
        this.arts = this.arts.filter(art => art.id !== artId);
        this.artsUpdated.next([...this.arts])
      })
  }
}
