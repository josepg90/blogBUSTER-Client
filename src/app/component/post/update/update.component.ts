import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  formularioUpdate: FormGroup;
  
  id: number;
  titulo:string;
  cuerpo: string;
  fecha: string;
  hora: string;
  //fechaNew: string;
  //horaNew: string;
  etiquetas: string;
  visible: boolean;
  checkeado:boolean;
  showForm: boolean;
  showSuccess: boolean;

  constructor(
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = this.oActivatedRoute.snapshot.params.id; 
    this.getPost();
    this.formularioUpdate = <FormGroup>this.oFormBuilder.group({
      id: [''],
      titulo: ['', [Validators.required, Validators.minLength(1)]],
      cuerpo: [''],
      fecha: [''],
      //hora: [''],
      //fechaNew: [''],
      //horaNew: [''],
      etiquetas: [''],
      visible: ['']
    })
    this.showForm = true;
    this.showSuccess = false; 
  }

  ngOnInit(): void {
  }

  getPost = () => {
    
    this.oPostService.getPost(this.id).subscribe((oPost:IPost) => {
      this.titulo=oPost.titulo;
      this.cuerpo=oPost.cuerpo;
      this.fecha=oPost.fecha.date.month + "-" + oPost.fecha.date.month + "-" + oPost.fecha.date.day + " " + oPost.fecha.time.hour + ":" + oPost.fecha.time.minute + ":" + oPost.fecha.time.second;
      this.etiquetas=oPost.etiquetas;
      this.visible=oPost.visible;
      console.log(this.visible);
      this.formularioUpdate = <FormGroup>this.oFormBuilder.group({
        id: [this.id],
        titulo: [this.titulo, [Validators.required, Validators.minLength(1)]],
        cuerpo: [this.cuerpo],
        fecha: [this.fecha],
        //hora: [this.hora],
        //fechaNew: [''],
        //horaNew: [''],
        etiquetas: [this.etiquetas],
        visible: [this.visible]
      })  
      var check = <HTMLInputElement> document.getElementById("visible");
      if(this.visible) {
        check.checked = true;
      } else {
        check.checked = false;
      }     
    })
  }

  onSubmit = () => {
      const formData: any = new FormData();

      var check = <HTMLInputElement> document.getElementById("visible");
      if(check.checked) {
        this.checkeado = true;
      } else {
        this.checkeado = false;
      }
      const newData = { id: this.formularioUpdate.get('id')!.value, titulo: this.formularioUpdate.get('titulo')!.value, cuerpo: this.formularioUpdate.get('cuerpo')!.value, fecha: "2012-04-04 14:14"/*this.formularioUpdate.get('fecha')!.value +" "+ this.formularioUpdate.get('hora')!.value*/, etiquetas:this.formularioUpdate.get('etiquetas')!.value, visible:this.checkeado};
      console.log("update:onSubmit: ", newData);
      this.oPostService.update(JSON.stringify(newData)).subscribe(data => {
        console.log(data);
        console.log(this.fecha); 
        console.log(this.hora);         
       } )
  }
}
