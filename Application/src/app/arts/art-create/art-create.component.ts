import { Component } from '@angular/core';

import { Art } from '../art.model';
import { ArtsService } from "../arts.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})

export class ArtCreateComponent {
  arts:Art[] = [];
  isLoading = false;
  private artsSub!: Subscription;
  imageUrl: any;

  constructor(public artsService: ArtsService, private sanitizer: DomSanitizer) {}

  ngOnInit(form: NgForm) {
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
    this.artsService.generateArt(form.value.keyword)
      .subscribe(arrayBuffer => {
        let blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        let objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log(blob);
        console.log(objectURL);
        this.isLoading = false;
      });
  }

  onAddArt(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.artsService.addArt(form.value.keyword, form.value.image);
    form.resetForm();
    this.isLoading = true;
  }
}
