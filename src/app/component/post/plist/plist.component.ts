import { PaginationService } from './../../../service/pagination.service';
import { PostService } from './../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IAdd, IFecha, IPage, IPost } from 'src/app/model/model-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-plist',
  templateUrl: './plist.component.html',
  styleUrls: ['./plist.component.css']
})
export class PlistComponent implements OnInit {

  aPosts: IPost[];
  oAdd:IAdd;
  totalElements: number;
  totalPages: number;
  page: number;
  rpp:number;
  barraPaginacion: string[];
  param: string;
  direction: string;
  strResult: string = "";
  id: number;
  titulo: string;
  cuerpo: string;
  fecha: IFecha;
  etiquetas: string;
  visible: boolean;
  filtro: string;
  fecha2: string;
  searchQuery: string = '';

  constructor(
    private oPaginationService: PaginationService,
    private oPostService: PostService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.page = 1;
    this.rpp = 3;
    
    this.param = this.oActivatedRoute.snapshot.params.param;
    this.direction = this.oActivatedRoute.snapshot.params.direction;
    this.param = "id";
    this.direction = "ASC";
    this.filtro = "";
    this.getPage();
  }

  ngOnInit(): void {
  }

 
  getPage = () => {
    this.oPostService.getPage(this.rpp, this.page, this.param, this.direction, this.filtro).subscribe((oPage: IPage) => {
      this.aPosts = oPage.content;
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
      
    })
  }

  getPost = () => {

    this.oPostService.getPost(this.id).subscribe((oPost:IPost) => {
      this.titulo=oPost.titulo;      
      this.cuerpo=oPost.cuerpo;
      this.fecha2=oPost.fecha.date.year + "-" + oPost.fecha.date.month + "-" + oPost.fecha.date.day + " " + oPost.fecha.time.hour + ":" + oPost.fecha.time.minute + ":" + oPost.fecha.time.second;
      this.etiquetas=oPost.etiquetas;
      this.visible=!oPost.visible;
      console.log(this.visible);
      
      this.cambioVisible();
    })

  }

  cambioVisible = () => {
    this.oAdd = { id: this.id, titulo: this.titulo, cuerpo: this.cuerpo, fecha: "2012-04-04 14:14"/*this.formularioUpdate.get('fecha')!.value +" "+ this.formularioUpdate.get('hora')!.value*/, etiquetas:this.etiquetas, visible:this.visible};
      console.log("update:onSubmit: ", this.oAdd);
      this.oPostService.update(this.oAdd).subscribe(data => {
        console.log(data);
           this.getPage();  
       } )
       
  }

  jumpToPage = () => {
    this.getPage();
    return false;
  }
  
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
  }

  new = (id: number, titulo: string, cuerpo: string, fecha: IFecha, etiquetas: string, visible: boolean):void => {
      this.id=id;
      this.titulo=titulo;
      this.cuerpo=cuerpo;
      this.fecha=fecha;
      this.etiquetas=etiquetas;
      this.visible=visible;
      this.openModal();
    
  }

  eventsSubject: Subject<void> = new Subject<void>();

  openModal():void {
    this.eventsSubject.next();
  }

  closeModal():void {
    this.oRouter.navigate(["/plist"]);
  }

}
