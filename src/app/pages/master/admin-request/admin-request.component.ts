import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminRequestService } from './admin-request.service';
import { TokenStorageService } from 'src/app/util/token-storage.service';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: []
})

export class AdminRequestComponent implements OnInit {
  
  passwordrequestData: any;
  currentReclutador: any;
  currentToken: any;

  constructor(private requestAdmin: AdminRequestService,
              private fb: FormBuilder,
              private tokenService:TokenStorageService) { }

  ngOnInit(): void {
   
  }

  public adminForm = this.fb.group({
    
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))
  })
  
  PasswordResetRequest(): void{

    var passwordRequest: any = {
      emailUsuario: this.adminForm.controls['emailUsuario'].value
    }

    this.requestAdmin.PasswordRequest(passwordRequest).subscribe(
      data => {
        this.passwordrequestData = data;
        console.log(this.passwordrequestData);

      } ,    
      err => {
      console.log(err);       
      } 
    )
  }

  
}
