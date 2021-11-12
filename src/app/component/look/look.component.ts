import { Component, Input, OnInit } from '@angular/core';
import { IFecha, IPost } from 'src/app/model/model-interfaces';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.css']
})
export class LookComponent implements OnInit {

  @Input() titulo: string;
  @Input() cuerpo: string;
  @Input() fecha: string;
  @Input() fecha2: IFecha;

  @Input() etiquetas: string;
  
  constructor(
    private oPostService: PostService
  ) { 
    console.log(this.fecha);
  }

  ngOnInit(): void {
  }
 
}
