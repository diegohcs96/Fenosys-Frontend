import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { SigninInterface } from '../signin-interface';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-signin-admin',
  templateUrl: './signin-admin.component.html',
  styles: [
  ]
})
export class SigninAdminComponent implements OnInit {

  admin_logged: any;

  constructor(private tokenstorageService: TokenStorageService,
    private signinService: SigninService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public signinadminForm = this.fb.group({

    usernameUsuario: new FormControl('', Validators.required), 

    passwordUsuario: new FormControl('', Validators.required)
  });

  SigninAdmin(): void {

    var admin: SigninInterface = {

      usernameUsuario: this.signinadminForm.controls['usernameUsuario'].value,
      passwordUsuario: this.signinadminForm.controls['passwordUsuario'].value
    }

    this.signinService.SigninMaster(admin).subscribe(
      data => {
        this.tokenstorageService.saveToken(data.token);
        this.tokenstorageService.saveUser(data);
        this.admin_logged = this.tokenstorageService.getUser();

        console.log(data);       
      },
      err => {
        console.log(err);
      }
    );
  }
}