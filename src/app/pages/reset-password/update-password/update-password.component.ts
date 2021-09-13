import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { PasswordUpdate } from '../request-password-interface';
import { RequestPasswordService} from '../request-password.service'

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
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
export class UpdatePasswordComponent implements OnInit {

  passwordupdateData: any = {};
  alert: any = {};
  token = localStorage.getItem('passwordresetToken');

  public passwordupdateForm = this.fb.group({
    passwordUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#*$:\^%&]/, {passwordspecialcharacter: true})
    ])),
    confirmcontrasena: new FormControl('')
  }, { validator: CustomValidators.passwordMatchValidator("contrasena", "confirmcontrasena") })

  constructor(private requestPasswordService:RequestPasswordService,private fb:FormBuilder,private tokenstorage:TokenStorageService) { }

  ngOnInit(): void {
  }

  PasswordUpdate(): any {
    var passwordUpdate: PasswordUpdate = {
      passwordUsuario: this.passwordupdateForm.controls['passwordUsuario'].value,
      restoreToken: this.token || ""
    }
    
    this.requestPasswordService.PasswordUpdate(passwordUpdate).subscribe(
      data => {
        console.log(data);
        this.tokenstorage.signOut();
        window.location.href = '/';
      },
      err => {
        this.alert.type = 'invalid';
        this.alert.message = err.error.message;
      }
    )
  }

}
