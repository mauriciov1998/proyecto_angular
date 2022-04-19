import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService} from 'src/app/servicios/userservice.service';
import {​​​ ActivatedRoute }​​​ from'@angular/router'
import Swal from 'sweetalert2';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  namePattern: any = /^[a-zA-Z\s]+$/
  nameusPattern: any = /^[a-zA-Z0-9_ ]+$/
  emailPattern: any = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  passPattern: any = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.namePattern)]),
      // name2: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.namePattern)]),
      // nameus: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern(this.nameusPattern)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passPattern), Validators.minLength(5), Validators.maxLength(15)])

    })
  }
  registroForm: FormGroup;

  public usuarios: any={
    password:'',
    rol:'',
    nombre:'',
    email:''
  }
  id :number = 0;
  constructor(private usuarioservice:UserserviceService, private activatedroute:ActivatedRoute, private router:Router) {
    this.activatedroute.params.subscribe((params:any) =>{
      this.recuperarusuario(params['id'])
      this.id=params['id']
    })
    this.registroForm=this.createFormGroup()
   }

  ngOnInit(): void {
    
  }
  
  recuperarusuario (id:number){
    this.usuarioservice.get_usuario(id).subscribe((resp:any) => {
      this.usuarios = resp.usuario[0]
      console.log('reee',this.usuarios)
    })
  }

  // guardarcambios(){
  //   if(this.registroForm.valid){
  //     this.usuarioservice.put_usuario(this.id, this.usuarios).subscribe((resp:any) => {
  //     this.usuarios = resp.usuario[0]
  //     console.log('aaasj',this.usuarios)
  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Datos actualizados!',
  //       showConfirmButton: false,
  //       timer: 2000
  //     }) 
  //     this.router.navigate(['/inicio']);
  //   })
  //   }
  //   else{
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Ingrese los campos requeridos correctamente',
  //       showConfirmButton: false,
  //       timer: 2000
  //     }) 
  //   }  
  // }
  guardarcambios(){
    this.usuarioservice.put_usuario(this.id, this.usuarios).subscribe((resp:any) => {
      this.usuarios = resp.usuario[0]
      Swal.fire({
              icon: 'success',
              title: 'Datos actualizados!',
              showConfirmButton: false,
              timer: 2000
            }) 
      this.router.navigate(['/inicio'])
    })
  }
  ir_atras = () =>{
    this.router.navigate(['/inicio'])
  }
  outLogin(){
    localStorage.clear()
    this.router.navigate(["/login"])
  }
  get name(){return this.registroForm.get('name');}
  // get name2(){return this.registroForm.get('name2');}
  get nameus(){return this.registroForm.get('nameus');}
  get email(){return this.registroForm.get('email');}
  get password(){return this.registroForm.get('password');}
}
