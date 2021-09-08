import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { SigninService } from '../signin.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SigninInterface } from '../signin-interface';
import { CustomValidators } from '../../tools/custom-validators';

@Component({
  selector: 'app-signin-master',
  templateUrl: './signin-master.component.html',
  styles: []
})
export class SigninMasterComponent implements OnInit {

  master_logged: any;
  alert = false;
  message: any;

  constructor(private tokenstorageService: TokenStorageService,
              private signinService: SigninService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public signinmasterForm = this.fb.group({

    usernameUsuario: new FormControl('', 
    Validators.required),     

    passwordUsuario: new FormControl('', Validators.compose([
      Validators.required,
      //Validators.minLength(8),
      //CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      //CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      //CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      //CustomValidators.patternValidator(/[@#$:\^%&]/, {passwordspecialcharacter: true})
    ])),
  });

  AlertDefault() {
    this.alert = false;
  }

  SigninMaster(): void {

    var master: SigninInterface = {

      usernameUsuario: this.signinmasterForm.controls['usernameUsuario'].value,
      passwordUsuario: this.signinmasterForm.controls['passwordUsuario'].value
    }

    this.signinService.SigninMaster(master).subscribe(
      data => {
        this.tokenstorageService.saveToken(data.token);
        this.tokenstorageService.saveUser(data);
        this.master_logged = this.tokenstorageService.getUser();

        console.log(data);       
        window.location.href='/request/admin';
      },
      err => {
        this.alert = true;
        this.message = err.error.message;
        console.log(err);
      }
    );
  }
}
