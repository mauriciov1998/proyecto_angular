import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserserviceService } from '../servicios/userservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: UserserviceService){

  }
  canActivate(): boolean{
    if(!this.authservice.isAuth()){
      console.log('el token no es valido o ya expiro');
      return false;
    }
    return true;
  }
  
}
