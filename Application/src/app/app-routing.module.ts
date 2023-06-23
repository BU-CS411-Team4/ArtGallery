import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtListComponent} from "./arts/art-list/art-list.component";
import {ArtCreateComponent} from "./arts/art-create/art-create.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: ArtListComponent },
  { path: 'create', component: ArtCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
