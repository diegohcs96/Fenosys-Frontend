import { Component, OnInit } from '@angular/core';
import { AdminRequestService } from './admin-request.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.component.html',
  styles: [
  ]
})
export class AdminRequestComponent implements OnInit {

  signupadminRequest_data: any;

  constructor(private adminrequestService: AdminRequestService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public signupadminrequestForm = this.fb.group({
    
    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ]))
  })

  AdminSignupRequest(): void {

    var signupadminRequest: any = {
      emailUsuario: this.signupadminrequestForm.controls['emailUsuario'].value
    }

    this.adminrequestService.SignupAdminRequest(signupadminRequest).subscribe(
      
      data => {
        this.signupadminRequest_data = data;
        console.log(this.signupadminRequest_data);
      },
      err => {
        console.log(err);
      }
    )
  }
}
