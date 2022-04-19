import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ExtraccionComponent } from './extraccion/extraccion.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ExtraccionCamaraComponent } from './extraccion-camara/extraccion-camara.component';
import { TipoExtraccionComponent } from './tipo-extraccion/tipo-extraccion.component';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    EditUserComponent,
    ExtraccionComponent,
    ExtraccionCamaraComponent,
    TipoExtraccionComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    MatToolbarModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    AlifeFileToBase64Module,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService //permite decodificar y verificar desde el aldo del servidor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
