import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs'
import { Art } from '../art.model';
import { ArtsService } from "../arts.service";

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit, OnDestroy {
  arts: Art[] = [];
  private artsSub!: Subscription;

  constructor(public artsService: ArtsService) {}

  ngOnInit() {
    this.artsService.getArts();
    this.artsSub = this.artsService.getArtUpdateListener()
      .subscribe((arts:Art[]) => {
        this.arts = arts;
      });
  }

  onDelete(artId: string){
    this.artsService.deleteArt(artId)
  }

  ngOnDestroy() {
    this.artsSub.unsubscribe();
  }
}
