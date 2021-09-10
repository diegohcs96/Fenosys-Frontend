import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { PasswordRequest } from '../request-password-interface';
import { RequestPasswordService } from '../request-password.service';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: [],
  styles: [
    `
    :host >>> .alert-valid {
      color: #ffffff;
      background-color: #2f55d4;
      border-color: #2f55d4;
      text-align: justify;
    }

    :host >>> .alert-invalid {
      color: #ffffff;
      background-color: #dc3545;
      border-color: #dc3545;
      text-align: justify;
    }
  `
  ]
})
export class RequestPasswordComponent implements OnInit {

  passwordrequestData: any = {};
  alert: any = {};
  
  public passwordrequestForm = this.fb.group({
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))
  })

  constructor(private fb:FormBuilder, private passwordRequestService:RequestPasswordService) { }

  ngOnInit(): void {
  }

  PasswordResetRequest(): void{
    var passwordRequest: PasswordRequest = {
      emailUsuario: this.passwordrequestForm.controls['emailUsuario'].value
    }

    this.passwordRequestService.SendUrlPasswordReset(passwordRequest).subscribe(
      data => {
        this.passwordrequestData = data;
        console.log(this.passwordrequestData);
        this.alert.type = 'valid';
        this.alert.message = this.passwordrequestData.message;
      },

      err => {
        this.alert.type = 'invalid';
        this.alert.message = err.error.message;
      }
    )
  }

}
