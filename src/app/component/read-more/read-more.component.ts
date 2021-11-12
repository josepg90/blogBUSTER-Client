import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {

  @Input() cuerpo: string;
  isReadMore: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  showText() {
    this.isReadMore = !this.isReadMore
  }
}
