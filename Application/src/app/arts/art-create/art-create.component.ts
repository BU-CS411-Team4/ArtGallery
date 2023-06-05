import { Component } from '@angular/core';

import { Art } from '../art.model';
import { ArtsService } from "../arts.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-art-create',
  templateUrl: './art-create.component.html',
  styleUrls: ['./art-create.component.css']
})

export class ArtCreateComponent {

  constructor(public artsService: ArtsService) {}

  onAddArt(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.artsService.addArt(form.value);
    form.resetForm();
  }
}
