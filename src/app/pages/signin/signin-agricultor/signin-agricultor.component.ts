import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { SigninInterface } from '../signin-interface';
import { SigninService } from '../signin.service';
declare const $:any; 

@Component({
  selector: 'app-signin-agricultor',
  templateUrl: './signin-agricultor.component.html',
  styles: []
})
export class SigninAgricultorComponent implements OnInit {

  agricultor_logged: any;
  alert = false;
  message: any;

  constructor(private tokenstorageService: TokenStorageService,
              private signinService: SigninService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    //Cargar el Jquery
    this.SeePassword();
  }

  public signinagricultorForm = this.fb.group({

    usernameUsuario: new FormControl('', 
    Validators.required),     

    passwordUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#$:\^%&]/, {passwordspecialcharacter: true})
    ])),
  });

  AlertDefault() {
    this.alert = false;
  }

  SeePassword(){
      $('#decrypt').on('click', function() {
        $('#password').attr('type', function(index:any,attr:any) {
          return attr == 'text' ? 'password' : 'text';
        })
      })
  }

  LoadPage(){
    $('#start').css('cursor', 'wait');
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
        $('#start').css('cursor', 'default');
        console.log(data);       
        //window.location.href='/request/admin';
      },
      err => {
        $('#start').css('cursor', 'default');
        this.alert = true;
        this.message = err.error.message;
        console.log(err);
      }
    );
  }
}
