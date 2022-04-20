import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ExtraccionCamaraComponent } from './extraccion-camara/extraccion-camara.component';
import { ExtraccionComponent } from './extraccion/extraccion.component';
import { AuthGuard } from './guards/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { TipoExtraccionComponent } from './tipo-extraccion/tipo-extraccion.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate:[AuthGuard]},
  { path: 'editar/:id', component: EditUserComponent, canActivate:[AuthGuard]},
  { path: 'extraccion', component: ExtraccionComponent, canActivate:[AuthGuard] },
  { path: 'extraccion_camara', component: ExtraccionCamaraComponent, canActivate:[AuthGuard]},
  { path: 'tipo_extraccion', component: TipoExtraccionComponent, canActivate:[AuthGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
