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


  getPais(): void {
    
    this.indexService.getPais().subscribe(
      data => {       
        

      },
      err => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }

  getDepartamento(): void {
    
    this.indexService.getDepartamentos().subscribe(
      data => {      

      },
      err => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }

  getProvincia(): void {
    
    this.indexService.getProvincias().subscribe(
      data => {       
        console.log(data);       
      },
      err => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }

  getDistrito(): void {
    
    this.indexService.getDistritos().subscribe(
      data => {       
        console.log(data);       
      },
      err => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }



}
