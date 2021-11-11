import { Component, OnInit } from '@angular/core';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {

  linesToWrite: Array<string>;
  private finishPage = 1;
  private actualPage: number;
  aPosts: IPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  rpp: number = 10;
  param: string = "fecha";
  direction: string = "ASC";
  filtro: string = "";

  constructor(
    private oPostService: PostService
  ) {
    this.actualPage = 1;
    this.getPage();
   }

  ngOnInit(){
    this.linesToWrite = new Array<string>();
    
  }

  add40lines() {
    const line = 'Another new line -- ';
    let lineCounter = this.linesToWrite.length;
    for (let i = 0; i < 40; i ++) {
      this.linesToWrite.push(line + lineCounter);
      lineCounter ++;
    }
  }

  onScroll() {
    if (this.actualPage < this.finishPage) {
      this. getPage();
      this.actualPage ++;
    } else {
      console.log('No more lines. Finish page!');
    }
  }
  getPage = () => {
    this.oPostService.getPage(this.rpp, this.page, this.param, this.direction, this.filtro).subscribe((oPage: IPage) => {
      
      this.aPosts = oPage.content;
      console.log(oPage);
      this.totalElements = oPage.totalElements;
      this.totalPages = oPage.totalPages;
      
      //this.barraPaginacion = this.oPaginationService.pagination(this.totalPages, this.page);
      
    })
  }
}
