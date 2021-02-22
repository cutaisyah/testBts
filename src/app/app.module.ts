import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MyMaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardsComponent } from './components/cards/cards.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardsComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MyMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
