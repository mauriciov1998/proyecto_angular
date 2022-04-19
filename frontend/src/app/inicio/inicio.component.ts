import {
  Component,
  OnInit
} from '@angular/core';
import {
  UserserviceService
} from 'src/app/servicios/userservice.service'
import {
  Router
} from '@angular/router';
import Swal from 'sweetalert2';
import {FormGroup, Validators, FormBuilder, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms' 
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
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
  valor:boolean;
  listadousuarios: any[] = []
  opcion: number;
  confirmar_password = '';
  public usuarios: any = {
    password: '',
    rol: '',
    nombre: '',
    email: ''
  }
  constructor(private userservice: UserserviceService, private router: Router) {
    this.registroForm=this.createFormGroup()
    this.valor=false
    this.opcion = -1;
  }

  ngOnInit(): void {
    this.recuperarUsuario()
  }
  agregar(){
    console.log('akis',this.registroForm.valid)
    if(this.registroForm.valid){
      if(this.confirmar_password == this.usuarios.password){
        this.userservice.addUser(this.usuarios).subscribe((resp: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro realizado',
            showConfirmButton: false,
            timer: 3000,
            
          }) 
          this.usuarios={}
          this.confirmar_password=''
        this.recuperarUsuario()
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Las contraseñas no coinciden',
          showConfirmButton: false,
          timer: 3000,
          
        }) 
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Ingrese los campos requeridos correctamente',
        showConfirmButton: false,
        timer: 2000
      }) 
    }
  }
  agregarUsuario() {
    // console.log(this.usuarios);
    this.userservice.addUser(this.usuarios).subscribe((resp: any) => {
      console.log(resp);
      // this.recuperarUsuario()
    })
  }
  recuperarUsuario() {
    // console.log(this.usuarios);
    this.userservice.getUser().subscribe((resp: any) => {
      this.listadousuarios = resp.usuario
      console.log(this.listadousuarios)
    })
  }
  eliminarUsuario(id: number) {
    Swal.fire({
      title: 'Esta seguro que desea eliminar al Administrador?',
      showDenyButton: true,
      icon: 'warning',
      //showCancelButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.userservice.deleteUser(id).subscribe(
            res=>{
              console.log("Admin eliminado")
              this.recuperarUsuario()
            },
            err=>{
              console.log(err)
            }
          )
          Swal.fire('Administrador eliminado', '', 'success')
        }
      })
    
  }
  editarUsuario(id: number) {
    this.router.navigate(['editar', id])
  }
  ir_atras = () => {
    this.router.navigate(['/login'])
  }

  // desde aqui es usuarios
  seleccion1() {
    this.opcion = 1
  }
  seleccion2() {
    this.opcion = 2
  }
  seleccion3() {
    this.opcion = 3
  }
  seleccion4() {
    this.opcion = 4
  }
  outLogin() {
    localStorage.clear()
    this.router.navigate(["/login"])

  }
  seleccion6() {
    this.router.navigate(["/tipo_extraccion"])
  }
  get name(){return this.registroForm.get('name');}
  // get name2(){return this.registroForm.get('name2');}
  // get nameus(){return this.registroForm.get('nameus');}
  get email(){return this.registroForm.get('email');}
  get password(){return this.registroForm.get('password');}
}
