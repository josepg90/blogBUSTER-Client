import { DateTimeService } from './../../../service/datetime.service';
import { Component, OnInit } from '@angular/core';
import { IAdd } from 'src/app/model/model-interfaces';
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
  checkeado: boolean;
  showForm: boolean;
  showSuccess: boolean;
  strResult: string = "";
  id: number = 0;
  oAdd: IAdd;

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

    this.showForm = true;
    this.showSuccess = false;
  }

  ngOnInit(): void {

    this.formularioNew = <FormGroup>this.oFormBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(2)]],
      cuerpo: ['', Validators.required],
      etiquetas: ['', Validators.required],
      fecha: ['', Validators.required],
      visible: ['']
    })
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

  onSubmit(): void {

    if (this.formularioNew) {
      this.oAdd = {
        id: null,
        titulo: this.formularioNew.value.titulo,
        cuerpo: this.formularioNew.value.cuerpo,
        etiquetas: this.formularioNew.value.etiquetas,
        fecha: this.oDateTimeService.getStrFecha2Send(this.formularioNew.value.fecha),
        visible: this.formularioNew.value.visible
      }
      this.new();
    }
  }

  new = (): void => {
    this.oPostService.create(this.oAdd).subscribe((id: number) => {
      if (id) {
        this.id = id;
        this.strResult = "????El post se ha creado correctamente!!";
      } else {
        this.strResult = "Error en la creaci??n del post";
      }
      this.openModal();
    })
  }

  eventsSubject: Subject<void> = new Subject<void>();

  openModal(): void {
    this.eventsSubject.next();
  }

  closeModal(): void {
    this.oRouter.navigate(["/view/" + this.id]);
  }

  goBack() {
    this.oLocation.back();
  }

}
