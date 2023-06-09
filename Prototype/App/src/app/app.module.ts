import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ArtCreateComponent } from './arts/art-create/art-create.component';
import { HeaderComponent } from "./header/header.component";
import { ArtListComponent } from "./arts/art-list/art-list.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArtCreateComponent,
    ArtListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
