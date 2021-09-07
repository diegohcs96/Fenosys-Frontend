import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { SignupAdmin } from './signup-admin';
import { SignupAdminService } from './signup-admin.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: []
})
export class SignupAdminComponent implements OnInit {
  selectedFotosPerfil: any;
  currentFotoPerfil: any;
  document: any;
  alert = false;
  message: any;


  constructor(private tokenstorageService : TokenStorageService, 
              private signinAdminService : SignupAdminService, 
              private fb : FormBuilder,
              private router: Router,
              private tokens: TokenStorageService) { }

  ngOnInit(): void {

   
  }

  public adminSignupForm = this.fb.group({

    nombreUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")   
    ])), 

    apellidoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern("([a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+( [a-zA-Z'àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.-]+)*)")
    ])), 

    paisUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(50),
    ])), 

    departamentoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(50),
    ])), 

    provinciaUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(50),
    ])), 

    distritoUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(50),
    ])), 

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

  subirFotoPerfil(): any {

    if (this.selectedFotosPerfil) {
      const fotoperfil: File | null = this.selectedFotosPerfil.item(0);

      if (fotoperfil) {
        this.currentFotoPerfil = fotoperfil;
      }

      return this.currentFotoPerfil;
    }
  }



  token = localStorage.getItem('passwordresetToken');

  SignUpAdmin() : void{

    this.token = location.href.slice(35); 
    console.log(this.token)
    
    var admin: SignupAdmin = {
      nombreUsuario : this.adminSignupForm.controls['nombreUsuario'].value,
      apellidoUsuario : this.adminSignupForm.controls['apellidoUsuario'].value,
      paisUsuario : this.adminSignupForm.controls['paisUsuario'].value,
      departamentoUsuario : this.adminSignupForm.controls['departamentoUsuario'].value,
      provinciaUsuario : this.adminSignupForm.controls['provinciaUsuario'].value,
      distritoUsuario : this.adminSignupForm.controls['distritoUsuario'].value,
      passwordUsuario : this.adminSignupForm.controls['passwordUsuario'].value, 
      restoretokenUsuario: this.token || ""
 
    }

    this.signinAdminService.SignUpAdmin(admin, this.subirFotoPerfil()).subscribe(
      data => {     

        //console.log("aea funco");    
        //console.log("aea se borro");    

  // this.router.navigate(['/postulante/' + this.loggedAdmin.idPostulante + '/profile']);
      } ,    
      err => {
        this.alert = true;
        this.message = err.error.message;
        console.log(err);       
      }
    )
  }


}
