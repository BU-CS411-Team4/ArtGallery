import {Art} from './art.model'
import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http'
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class ArtsService {
  private arts: Art[] = [];
  private artsUpdated = new Subject<Art[]>();

  constructor(private http: HttpClient) {}

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
            artFile: art.artFile,
            id: art._id
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

  addArt(keyword:string, artFile:string) {
    const art: Art = {id: '', keyword:keyword, artFile:artFile};
    this.http
      .post<{message:string, artId: string}>('http://localhost:3000/api/arts', art)
      .subscribe((responseData) => {
        art.id = responseData.artId;
        this.arts.push(art)
        this.artsUpdated.next([...this.arts])
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
