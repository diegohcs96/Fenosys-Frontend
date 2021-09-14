import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent implements OnInit {
  message: any;

  pais:any=[];
  departamento:any=[];
  provincia:any=[];
  distrito:any=[];
  

  constructor(private indexService: IndexService) { }

  ngOnInit(): void {
    
  }




}
