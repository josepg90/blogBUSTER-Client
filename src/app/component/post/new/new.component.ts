import { DateTimeService } from './../../../service/datetime.service';
import { Component, OnInit } from '@angular/core';
import { IAdd} from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

declare let $: any;

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
    formularioNew: FormGroup;
    checkeado:boolean;
    showForm:boolean;
    showSuccess:boolean;
    date:string;
    strResult: string = "";
    id: number = 0;
    oAdd: IAdd;
    /*oAdd: any[];
    titulo: string;
    cuerpo: string;
    fecha: string;
    etiquetas: string;
    visible: boolean;  */

    get f() { return this.formularioNew.controls; }

  constructor(
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oDateTimeService: DateTimeService,
    private oLocation: Location  

  ) { 

    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem("user", strUsuarioSession);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.formularioNew = <FormGroup>this.oFormBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      cuerpo: ['', Validators.required],
      etiquetas: ['', Validators.required],
      fecha: ['', Validators.required],
      visible: ['']
    })
    
    this.showForm = true;
    this.showSuccess = false; 
  }

  ngOnInit(): void {
    $('#fecha').datetimepicker({
      defaultDate: "+1w",
      numberOfMonths: 1,
      dateFormat: 'dd-mm-yy',
      timeFormat: 'hh:mm',
      showAnim: "fold",
      onClose: (dateText: string, inst: any) => {
        this.formularioNew.controls['fecha'].setValue(dateText);
        this.formularioNew.controls['fecha'].markAsDirty();
      }
    });
  }

  onSubmit (): void {
    /*this.oPostService.postPost(this.oAdd).subscribe(data => {
      this.titulo = (<HTMLInputElement>document.getElementById('titulo')).value;
      this.cuerpo = (<HTMLInputElement>document.getElementById('cuerpo')).value;
      this.fecha = "2021-10-27 19:04";
      this.etiquetas = (<HTMLInputElement>document.getElementById('etiqutas')).value;
      this.visible = true;
      this.oAdd.push({"titulo":this.titulo, "cuerpo":this.cuerpo, "fecha":this.fecha, "etiquetas":this.etiquetas, "visible":this.visible});
      })*/
      const formData: any = new FormData();

      var check = <HTMLInputElement> document.getElementById("visible");
      /*if(check.checked) {
        this.checkeado = true;
      } else {
        this.checkeado = false;
      }
      this.date = this.formularioNew.get('fecha')!.value +" "+ this.formularioNew.get('hora')!.value;
      const newData = { titulo: this.formularioNew.get('titulo')!.value, cuerpo: this.formularioNew.get('cuerpo')!.value, fecha: this.date, etiquetas:this.formularioNew.get('etiquetas')!.value, visible: this.formularioNew.get('visible')!.value};
      console.log("create:onSubmit: ", newData);
      this.oPostService.create(JSON.stringify(newData)).subscribe(data => {
        console.log(data);
        console.log(this.formularioNew.get('fecha')!.value)
        console.log(this.formularioNew.get('visible')!.value)
        this.new();
       } )*/

       //this.date = this.formularioNew.get('fecha')!.value +" "+ this.formularioNew.get('hora')!.value;

       if (this.formularioNew) {
        this.oAdd = {
          id: null,
          titulo: this.formularioNew.value.titulo,
          cuerpo: this.formularioNew.value.cuerpo,
          etiquetas: this.formularioNew.value.etiquetas,
          fecha: "2021-10-27 19:04",
          visible: this.formularioNew.value.visible
        }
        this.new();
      }

  }

  new = ():void => {
    this.oPostService.create(this.oAdd).subscribe((id: number) => {
      if (id) {
        this.id = id;
        this.strResult = "¡¡El post se ha creado correctamente!!";
      } else {
        this.strResult = "Error en la creación del post";
      }
      this.openModal();
    })
  }

  eventsSubject: Subject<void> = new Subject<void>();

  openModal():void {
    this.eventsSubject.next();
  }

  closeModal():void {
    this.oRouter.navigate(["/view/" + this.id]);
  }
  
  goBack() {
    this.oLocation.back();
  }

}
