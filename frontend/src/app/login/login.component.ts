import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserserviceService} from 'src/app/servicios/userservice.service' 
import Swal from 'sweetalert2';
import decode from 'jwt-decode'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
datos_login = {email:'', password: ''}
  constructor(private service : UserserviceService, private router: Router) { }
  decodificarToken(): any {
    let token: any = localStorage.getItem('token')
    return decode(token)
  }
  ngOnInit(): void {
  }
  login(datos_login:any) {
    console.log('akii',datos_login)
    this.service.login(datos_login).subscribe((res:any)=>{
      if (res.ok == true){
        this.guardarToken(res.token)
        Swal.fire({
          icon: 'success',
          title: 'Login correcto',
          showConfirmButton: false,
          timer: 2000
        }) 
        // console.log('akkkkkkkkkkkkkkkkkkkkkk',this.decodificarToken())
        if (this.decodificarToken().id_usario == 12){
          this.router.navigate(['/inicio'])
        }
        else{
          this.router.navigate(['/tipo_extraccion'])
        }
       
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Nombre de Usuario y/o Contraseña incorrectos',
          showConfirmButton: false,
          timer: 2000
        })
      }
    })
  }
  guardarToken(token: string) {
    localStorage. setItem('token', token)
     }
}
