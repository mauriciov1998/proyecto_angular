import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tipo-extraccion',
  templateUrl: './tipo-extraccion.component.html',
  styleUrls: ['./tipo-extraccion.component.css']
})
export class TipoExtraccionComponent implements OnInit {

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  ir_reconocimiento_camara(){
    this.router.navigate(['extraccion_camara'])
  } 
  ir_reconocimiento_file(){
    this.router.navigate(['extraccion'])
  }
}
