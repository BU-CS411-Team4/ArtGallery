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

  constructor(public artsService: ArtsService) {}

  ngOnInit(form: NgForm) {
    this.artsSub = this.artsService.getArtUpdateListener()
      .subscribe((arts:Art[]) => {
        this.isLoading = false;
      })
  }

  onAddArt(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.artsService.addArt(form.value['keyword'], 'This is where the Art File will be saved');
    form.resetForm();
    this.isLoading = true;
  }
}
