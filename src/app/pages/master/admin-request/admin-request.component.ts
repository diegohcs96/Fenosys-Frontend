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

  currentReclutador: any;
  currentToken: any;

  message: any;
  passwordrequestData: any;

  alert = false;
  alert_class: any;

  constructor(private requestAdmin: AdminRequestService,
    private fb: FormBuilder,
    private tokenService: TokenStorageService) { }

  ngOnInit(): void {

  }

  public adminForm = this.fb.group({

    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))
  })

  DisplayAlert() {
    this.alert = true;
  }

  PasswordResetRequest(): void {

    var passwordRequest: any = {
      emailUsuario: this.adminForm.controls['emailUsuario'].value
    }

    this.requestAdmin.PasswordRequest(passwordRequest).subscribe(
      data => {
        this.alert_class = 'alert alert-info bg-soft-info text-justify';
        this.message = data.message;
      },
      err => {
        this.alert_class = 'alert alert-danger text-justify';
        this.message = err.error.message;
      }
    )
  }
}
