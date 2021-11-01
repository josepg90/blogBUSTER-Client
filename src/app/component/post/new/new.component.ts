import { Component, OnInit } from '@angular/core';
import { IAdd} from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    /*oAdd: any[];
    titulo: string;
    cuerpo: string;
    fecha: string;
    etiquetas: string;
    visible: boolean;  */

  constructor(
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router
  ) { 
    this.formularioNew = <FormGroup>this.oFormBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(1)]],
      cuerpo: [''],
      fecha: [''],
      hora: [''],
      etiquetas: [''],
      visible: ['']
    })
    this.showForm = true;
    this.showSuccess = false; 
  }

  ngOnInit(): void {
  }

  onSubmit = () => {
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
      }*/
      this.date = this.formularioNew.get('fecha')!.value +" "+ this.formularioNew.get('hora')!.value;
      const newData = { titulo: this.formularioNew.get('titulo')!.value, cuerpo: this.formularioNew.get('cuerpo')!.value, fecha: this.date, etiquetas:this.formularioNew.get('etiquetas')!.value, visible: this.formularioNew.get('visible')!.value};
      console.log("create:onSubmit: ", newData);
      this.oPostService.create(JSON.stringify(newData)).subscribe(data => {
        console.log(data);
        console.log(this.formularioNew.get('fecha')!.value)
        console.log(this.formularioNew.get('visible')!.value)

       } )
  }

}
