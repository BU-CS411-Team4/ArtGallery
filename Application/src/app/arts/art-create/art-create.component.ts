import { Component } from '@angular/core';

import { Art } from '../art.model';
import { ArtsService } from "../arts.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})

export class ArtCreateComponent {
  arts:Art[] = [];
  isLoading = false;
  private artsSub!: Subscription;
  output: any;
  keyword: any;

  constructor(public artsService: ArtsService) {}

  ngOnInit() {
    this.artsSub = this.artsService.getArtUpdateListener()
      .subscribe((arts:Art[]) => {
        this.isLoading = false;
      })
  }

  onGenerateArt(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.keyword = form.value.keyword;
    this.artsService.generateArt(this.keyword)
      .subscribe(response => {
        console.log(response)
        this.output = response;
        this.isLoading = false;
      });
  }

  onAddArt() {
    this.isLoading = true;
    this.artsService.addArt(this.output)
  }

  ngOnDestroy() {
    this.artsSub.unsubscribe();
  }
}
