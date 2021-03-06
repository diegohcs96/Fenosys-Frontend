import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { SigninInterface } from '../signin-interface';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-signin-agricultor',
  templateUrl: './signin-agricultor.component.html',
  styles: []
})
export class SigninAgricultorComponent implements OnInit {

  agricultor_logged: any;
  alert = false;
  message: any;

  fieldTextType: boolean | undefined;

  constructor(private tokenstorageService: TokenStorageService,
    private signinService: SigninService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public signinagricultorForm = this.fb.group({

    usernameUsuario: new FormControl('',
      Validators.required),

    passwordUsuario: new FormControl('',
      Validators.required),
  });

  AlertDefault() {
    this.alert = false;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  SigninAgricultor(): void {

    var agricultor: SigninInterface = {

      usernameUsuario: this.signinagricultorForm.controls['usernameUsuario'].value,
      passwordUsuario: this.signinagricultorForm.controls['passwordUsuario'].value
    }

    this.signinService.SigninAgricultor(agricultor).subscribe(
      data => {
        this.tokenstorageService.saveToken(data.token);
        this.tokenstorageService.saveUser(data);
        this.agricultor_logged = this.tokenstorageService.getUser();
        window.location.href = '/profile/agricultor';
      },
      err => {
        this.alert = true;
        this.message = err.error.message;
        console.log(err);
      }
    );
  }
}
