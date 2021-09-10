import { Component, OnInit } from '@angular/core';
import {RequestPasswordService} from '../request-password.service'

@Component({
  selector: 'app-load-request',
  templateUrl: './load-request.component.html',
  styleUrls: []
})
export class LoadRequestComponent implements OnInit {

  constructor(private requestPasswordService:RequestPasswordService) { }

  ngOnInit(): void {
    this.LoadUpdatePassword();
  }

  LoadUpdatePassword(): any {
    
    this.requestPasswordService.GetPasswordUpdateTemplate().subscribe(
      data => {
        console.log(data);
      },
      err => {
      }
    )
  }

}
