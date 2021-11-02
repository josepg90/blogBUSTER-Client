import { PaginationService } from './../../../service/pagination.service';
import { PostService } from './../../../service/post.service';
import { Component, OnInit } from '@angular/core';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plist',
  templateUrl: './plist.component.html',
  styleUrls: ['./plist.component.css']
})
export class PlistComponent implements OnInit {

  aPosts: IPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  rpp:number;
  barraPaginacion: string[];
  param: string;
  direction: string;
  
  //id:number;

  constructor(
    private oPaginationService: PaginationService,
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.page = 1;
    this.rpp = 3;
    
    this.param = this.oActivatedRoute.snapshot.params.param;
    this.direction = this.oActivatedRoute.snapshot.params.direction;
    this.param = "id";
    this.direction = "ASC";
    this.getPage();
  }

  ngOnInit(): void {
  }

 
  getPage = () => {
    this.oPostService.getPage(this.rpp, this.page, this.param, this.direction).subscribe((oPage: IPage) => {
      this.aPosts = oPage.content;
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
    })
  }

  jumpToPage = () => {
    this.getPage();
    return false;
  }
  

  /*getDropdown = () => {
    this.oPostService.getPage(this.rpp, this.page).subscribe((oPage: IPage) => {
      this.aPosts = oPage.content;
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
      
    })

  }*/

}
