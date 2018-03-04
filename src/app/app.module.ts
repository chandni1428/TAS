import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from "ngx-bootstrap";
import { AppRoutingModule } from './app-routing.module';

import { QuestionsService } from './questions/questions.service';

import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { AddQueComponent } from './questions/add-que/add-que.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    AddQueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [ QuestionsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
