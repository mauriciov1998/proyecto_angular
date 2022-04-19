import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
// import { EventEmitter } from 'stream';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  // cbImage: EventEmitter= new EventEmitter();
  constructor(private http:HttpClient, private router: Router, private jwthelper: JwtHelperService) { }

  addUser(datos: any){
    return this.http.post("http://localhost:3000/usuarios", datos)
  }
  addcabecera_datos(datos: any){
    return this.http.post("http://localhost:3000/datos_cabecera", datos)
  }
  add_linea_cabecera_datos(datos: any){
    return this.http.post("http://localhost:3000/lineas_datos_cabecera", datos)
  }

  getUser(){
    return this.http.get("http://localhost:3000/usuarios")
  }
  deleteUser(id:number){
    return this.http.delete(`http://localhost:3000/usuarios/${id}`)
  }
  editarUser(id:number, datos:any){
    return this.http.put(`http://localhost:3000/usuarios/${id}`, datos)
  }

  obtenerUser(id:number){
    return this.http.get(`http://localhost:3000/usuarios/${id}`)
  }
  
  login(datos:any){
    return this.http.post(`http://localhost:3000/login`, datos)
  }
  get_usuario(id:number){
    return this.http.get(`http://localhost:3000/usuario/${id}`)
  }
  put_usuario(id:number, datos:any){
    return this.http.put(`http://localhost:3000/usuarios/${id}`,datos)
  }

  obtenerdatosjson_base64(file:any){
    const filename = this.DataURIToBlob(file)
    const formData = new FormData(); 
    formData.append('file', filename);
    return this.http.post(`http://localhost:3002/api/analyze`,formData)
    
  }
  obtenerdatosjson(file:any){
    const formData = new FormData(); 
    formData.append("file", file, file.name);
    return this.http.post(`http://localhost:3002/api/analyze`,formData) 
  }
  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
  }
  isAuth():boolean{
    const token = localStorage.getItem('token');
    if (this.jwthelper.isTokenExpired(token!) || !localStorage.getItem('token')){
        return false;
    }
    return true;
  }
}
