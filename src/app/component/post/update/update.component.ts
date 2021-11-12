import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdd, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';
import { Location } from '@angular/common';
import { DateTimeService } from 'src/app/service/datetime.service';
import { Subject } from 'rxjs';

declare let $: any;

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  formularioUpdate: FormGroup;
  oPost: IPost = null;
  oAdd: IAdd = null;
  id: number;
  titulo: string;
  cuerpo: string;
  fecha: string;
  hora: string;
  etiquetas: string;
  visible: boolean;
  checkeado: boolean;
  showForm: boolean;
  showSuccess: boolean;
  strResult: string = null;


  get f() { return this.formularioUpdate.controls; }

  constructor(
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oLocation: Location,
    private oDateTimeService: DateTimeService
  ) {

    if (this.oActivatedRoute.snapshot.data.message) {
      const strUsuarioSession: string = this.oActivatedRoute.snapshot.data.message;
      localStorage.setItem("user", strUsuarioSession);
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getPost();

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
        this.formularioUpdate.controls['fecha'].setValue(dateText);
        this.formularioUpdate.controls['fecha'].markAsDirty();
      }
    });
  }

  getPost = (): void => {
    this.oPostService.getPost(this.id).subscribe((oDatos: IPost) => {
      this.oPost = oDatos;
      this.formularioUpdate = this.oFormBuilder.group({
        id: [this.oPost.id],
        titulo: [this.oPost.titulo, [Validators.required, Validators.minLength(2)]],
        cuerpo: [this.oPost.cuerpo, Validators.required],
        etiquetas: [this.oPost.etiquetas, Validators.required],
        fecha: [this.oDateTimeService.getStrFecha2Show(this.oPost.fecha), Validators.required],  //, Validators.pattern(this.fechaHoraPattern)
        visible: [this.oPost.visible]
      });
      var check = <HTMLInputElement>document.getElementById("visible");
      if (this.visible) {
        check.checked = true;
      } else {
        check.checked = false;
      }
    })
  }

  onSubmit(): void {
    var check = <HTMLInputElement>document.getElementById("visible");
    if (check.checked) {
      this.checkeado = true;
    } else {
      this.checkeado = false;
    }
    if (this.formularioUpdate) {
      this.oAdd = {
        id: this.formularioUpdate.value.id,
        titulo: this.formularioUpdate.value.titulo,
        cuerpo: this.formularioUpdate.value.cuerpo,
        etiquetas: this.formularioUpdate.value.etiquetas,
        fecha: this.oDateTimeService.getStrFecha2Send(this.formularioUpdate.value.fecha), //this.getStrFecha2Send($('#fecha').val()),
        visible: this.checkeado
      }

      this.update();
    }
  }

  update = (): void => {
    this.oPostService.update(this.oAdd).subscribe((result: number) => {
      if (result) {
        this.strResult = "¡¡El post se ha actualizado correctamente!!";
      } else {
        this.strResult = "Error en la actualización del post, no se ha podido modificar";
      }
      this.openModal();
    })
  }

  goBack(): void {
    this.oLocation.back();
  }

  //modal

  eventsSubject: Subject<void> = new Subject<void>();

  openModal(): void {
    this.eventsSubject.next();
  }

  closeModal(): void {
    this.oRouter.navigate(["/view/" + this.id]);
  }
}
