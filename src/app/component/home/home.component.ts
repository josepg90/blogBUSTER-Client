import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage, IPost } from 'src/app/model/model-interfaces';
import { PaginationService } from 'src/app/service/pagination.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'blogBUSTER-client-2021';

  aPosts: IPost[];
  totalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  rpp: number = 5;
  //rpp:number;
  param: string = "fecha";
  direction: string = "ASC";
  filtro: string = "";
  isReadMore:boolean = true;
  private finishPage = 3;
  private actualPage: number;
    
  constructor(
    private oPaginationService: PaginationService,
    private oPostService: PostService,
    private oRoute: ActivatedRoute,
    
    ) {
      if (this.oRoute.snapshot.data.message) {
        localStorage.setItem("user", this.oRoute.snapshot.data.message);
      } else {
        localStorage.clear();
      }
 
    this.page = 1;
    this.actualPage = 1;
    this.getPage();
    
  }

  reset() {
    this.title = 'blogBUSTER-client-2021';
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

  jumpToPage = () => {
    this.getPage();
    return false;
  }

  onScroll() {
    if (this.actualPage < this.finishPage) {
      this.getPage();
      this.actualPage ++;
    } else {
      console.log('No more lines. Finish page!');
    }
  }
  
}
