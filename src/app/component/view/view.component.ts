
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFecha, IPage, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  ePosts: IPost[];
  id: number;
  titulo:string;
  cuerpo: string;
  fecha: string;
  etiquetas: string;
  visible: boolean;

  
  constructor(
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getPost();
   }
  


  ngOnInit(): void {
  }


  getPost = () => {
    
    this.oPostService.getPost(this.id).subscribe((oPost:IPost) => {
      this.titulo=oPost.titulo;
      console.log(this.titulo);
      this.cuerpo=oPost.cuerpo;
      this.fecha=oPost.fecha.date.year + "-" + oPost.fecha.date.month + "-" + oPost.fecha.date.day + " " + oPost.fecha.time.hour + ":" + oPost.fecha.time.minute + ":" + oPost.fecha.time.second;
      this.etiquetas=oPost.etiquetas;
      this.visible=oPost.visible;
      
             
    })

  }
}
