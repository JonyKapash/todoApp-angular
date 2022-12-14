import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup'

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { TodoComponent } from './components/todo/todo.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, TodoComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
