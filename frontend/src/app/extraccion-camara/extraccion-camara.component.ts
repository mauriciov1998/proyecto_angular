import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  Page,
  recognize
} from 'tesseract.js';
import { Router } from '@angular/router';
import {
  createWorker
} from 'tesseract.js';
import Swal from 'sweetalert2';
import {
  UserserviceService
} from 'src/app/servicios/userservice.service'
import {
  runInThisContext
} from 'vm';
@Component({
  selector: 'app-extraccion-camara',
  templateUrl: './extraccion-camara.component.html',
  styleUrls: ['./extraccion-camara.component.css']
})
export class ExtraccionCamaraComponent implements OnInit {
  @ViewChild('inputImage') inputImage!: ElementRef;
  @ViewChild('outputImage') outputimage!: ElementRef;
  bandera: boolean = false;
  public cx: any = CanvasRenderingContext2D;
  public worker: any;
  public carga: any;
  fileToUpload: File | null = null;
  shortLink: string = "";
  loading: boolean = false; // Flag variable    
  file: any; // Variable to store file
  filecam: any;
  valores_cargados = false;
  datos_factura = {
    nombre_empresa: '',
    direccion_empresa: '',
    telefono_empresa: '',
    lugar_fecha: '',
    nit: '',
    cliente_archivo: '',
    tipo_archivo:'',
    valor_total_literal: '',
    total_archivo:''
  }
  contenido_tabla: any[] = [];
  constructor(private userservice: UserserviceService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  guardar_datos_cabecera(){
    if (this.valores_cargados == true){
      this.userservice.addcabecera_datos(this.datos_factura).subscribe((resp:any)=>{
        console.log('hola mundo',resp)
      })
    }
    else{
      Swal.fire({
        icon: 'success',
        title: 'No hay nada que guardar',
        showConfirmButton: false,
        timer: 3000,
      }) 
    }
  }
  ngOnInit(): void {}
  onChange(event: any) {
    this.file = event.target.files[0];
    this.initSetup();
  }
  onChanged(event: any) {
    // this.filecam = event.target.src;
    // console.log('inciiar', this.filecam)
    this.initSetup();
  }

  ngAfterViewInit() {}

  algoencamra = (event: any) => {
    this.filecam = event.target.src;
    console.log('porfin!', this.filecam)
  }
  enviardata_imagen_subida() {
    if (this.file) {
      this.loading = !this.loading;
      this.userservice.obtenerdatosjson(this.file).subscribe((resp: any) => {
        this.datos_factura.nombre_empresa = resp.output[0].fields.nombre_empresa.valueData.text
        console.log(resp.output[0].fields.name_empresa.valueData.text);
        this.datos_factura.direccion_empresa = resp.output[0].fields.direccion_empresa.valueData.text
        this.datos_factura.telefono_empresa = resp.output[0].fields.telefono_empresa.valueData.text
        this.datos_factura.lugar_fecha = resp.output[0].fields.lugar_fecha.valueData.text
        this.datos_factura.nit = resp.output[0].fields.nit.valueData.text
        this.datos_factura.cliente_archivo = resp.output[0].fields.cliente_archivo.valueData.text
        this.datos_factura.valor_total_literal = resp.output[0].fields.valor_total_literal.valueData.text
        this.datos_factura.total_archivo = resp.output[0].fields.total_archivo.valueData.text
        this.valores_cargados = true;
      })
    } else {
      alert("NO EXISTE UN ARCHIVO CARGADO!")
    }

  }
  enviardata_base64() {
    if (this.filecam) {
      this.loading = !this.loading;
      this.userservice.obtenerdatosjson_base64(this.filecam).subscribe((resp: any) => {
        this.datos_factura.nombre_empresa = resp.output[0].fields.nombre_empresa.valueData.text
        this.datos_factura.direccion_empresa = resp.output[0].fields.direccion_empresa.valueData.text
        this.datos_factura.telefono_empresa = resp.output[0].fields.telefono_empresa.valueData.text
        this.datos_factura.lugar_fecha = resp.output[0].fields.lugar_fecha.valueData.text
        this.datos_factura.nit = resp.output[0].fields.nit.valueData.text
        this.datos_factura.cliente_archivo = resp.output[0].fields.cliente_archivo.valueData.text
        this.datos_factura.valor_total_literal = resp.output[0].fields.valor_total_literal.valueData.text
        this.datos_factura.total_archivo = resp.output[0].fields.total_archivo.valueData.text
        this.valores_cargados = true;
      })
    } else {
      alert("no existe captura cargada!")
    }
  }

  enviardatatable() {
    
    if (this.filecam) {
      this.loading = !this.loading;
      this.userservice.obtenerdatosjson(this.filecam).subscribe((resp: any) => {
        // console.log(resp.output[0].fields.date.valueData.text);
        console.log('entroooo')
        this.contenido_tabla = resp.output[0].fields.contenido_tabla.value
        // alert( this.contenido_tabla )
      })
    } else {
      alert("No existe archivo cargado para extraer contenido")
    }

  }

  enviardatatable_captura() {
    if (this.filecam) {
      this.loading = !this.loading;
      this.userservice.obtenerdatosjson_base64(this.filecam).subscribe((resp: any) => {
        this.contenido_tabla = resp.output[0].fields.contenido_tabla.value
        console.log(this.contenido_tabla)
      })
    } else {
      alert("No existe captura cargada para extraer contenido")
    }

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

  }
  loadingProgress = (logger: any) => {
    console.log(logger)
  }

  initializacion = async () => {
    const carga = true;
    const imageElement = this.inputImage.nativeElement;
    const {
      data
    } = await recognize(imageElement, 'spa', {
      logger: m => this.loadingProgress(m)
    });
    console.log('laptamre', data.words);
    this.draw(data);
  };

  initSetup = () => {
    const imageElement = this.inputImage.nativeElement;
    const canvasElement = this.outputimage.nativeElement;
    const that = this;
    imageElement.onload = function () {
      const {
        naturalWidth,
        naturalHeight
      } = imageElement;
      console.log(naturalWidth, naturalHeight);
      that.cx = canvasElement.getContext('2d');
      that.cx.lineWidth = 5;
      that.cx.lineCap = 'square';
      that.cx.strokeStyle = 'green';
      canvasElement.width = naturalWidth;
      canvasElement.height = naturalHeight;
      console.log('initsetup');

    }
    this.initializacion();
  }

  draw = (dataIn) => {
    dataIn.words.forEach(w => {
      const bounding = w.bbox;
      console.log(bounding)
      this.cx.strokeStyle = 'green';
      //falta ver que pasa con strokestyle
      this.cx.strokeRect(bounding.x0, bounding.y0, bounding.x1 - bounding.x0, bounding.y1 - bounding.y0);
      this.cx.beginPath();
      this.cx.moveTo(w.baseline.x0, w.baseline.y0);
      this.cx.lineTo(w.baseline.x1, w.baseline.y1);
      this.cx.stroke();
    });
  };


  pdfcargado = () => {
    console.log('imagen lista');
  }
  ir_atras = () =>{
    this.router.navigate(['/tipo_extraccion'])
  }
  reloadCurrentPage() {
    window.location.reload();
   }

   cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['login'])
   }
}
