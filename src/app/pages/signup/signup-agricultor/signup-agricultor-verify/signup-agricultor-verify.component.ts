import { Component, OnInit } from '@angular/core';
import { SignupAgricultorService } from '../signup-agricultor.service';
import { SignupVerify } from './signup-verify';
import { SigninInterface } from '../../../signin/signin-interface';

@Component({
  selector: 'app-signup-agricultor-verify',
  templateUrl: './signup-agricultor-verify.component.html',
  styles: [
  ]
})
export class SignupAgricultorVerifyComponent implements OnInit {

  verify_token: any;

  constructor(private signupagricultorService: SignupAgricultorService) { }

  ngOnInit(): void {
    this.SignupAgricultorVerify();
  }

  SignupAgricultorVerify() {
    //DEV
    //this.verify_token = location.href.slice(47);
    //QA
    this.verify_token = location.href.slice(55);

    var agricultor_verify: SignupVerify = {
      utilityToken: this.verify_token
    }

    this.signupagricultorService.SignupAgricultorVerify(agricultor_verify).subscribe(
      data => {
        console.log(data);
      },
    );
  }
}
