import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data, map } from 'jquery';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { SignupAgricultor } from './signup-agricultor';
import { SignupAgricultorService } from './signup-agricultor.service';

@Component({
  selector: 'app-signup-agricultor',
  templateUrl: './signup-agricultor.component.html',
  styleUrls: []
})
export class SignupAgricultorComponent implements OnInit {
  selectedFotosPerfil: any;
  currentFotoPerfil: any;
  alert = false;
  message: any;

  Paises: any;
  Departamentos: any;
  Provincias: any;
  Distritos: any;

  
  constructor(private tokenstorageService : TokenStorageService, 
              private signupAgricultorService : SignupAgricultorService, 
              private fb : FormBuilder,
              private router: Router,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPais();
    this.getDepartamento();
    this.getProvincia();
    this.getDistrito();
  }

  onSelect(event: any): void {
    console.log('Id ->', event.target.value);
  }
 
  public agricultorSignupForm = this.fb.group({

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

    paisUsuario: new FormControl('', Validators.required),

    departamentoUsuario: new FormControl('', Validators.required),

    provinciaUsuario: new FormControl('', Validators.required),

    distritoUsuario: new FormControl('', Validators.required),

    emailUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),


    usernameUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ])),
 
    passwordUsuario: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, {passworduppercase: true}),
      CustomValidators.patternValidator(/[a-z]/, {passwordsmallcase: true}),
      CustomValidators.patternValidator(/[@#*$:\^%&]/, {passwordspecialcharacter: true})
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
  
  SignUpAgricultor() : void{
    
    var agricultor: SignupAgricultor = {
      nombreUsuario : this.agricultorSignupForm.controls['nombreUsuario'].value,
      apellidoUsuario : this.agricultorSignupForm.controls['apellidoUsuario'].value,
      iddistritoUsuario : 1,
      emailUsuario : this.agricultorSignupForm.controls['emailUsuario'].value,
      usernameUsuario : this.agricultorSignupForm.controls['usernameUsuario'].value,
      passwordUsuario : this.agricultorSignupForm.controls['passwordUsuario'].value,        
    }

    this.signupAgricultorService.SignUpAgricultor(agricultor, this.subirFotoPerfil()).subscribe(
      data => {     
        console.log(data);       

    //this.router.navigate(['/signup/administrador']);
      } ,    
      err => {
        this.alert = true;
        this.message = err.error.message;
        console.log(err);
        console.log(err);       
      }
    )
  }

  //Ubicacion
   
  getPais(): void {
    
    this.signupAgricultorService.getPais().subscribe(
      data => {      
        this.Paises = data.sort((a: any, b: any) => b.nombrePais - a.nombrePais);
        console.log(data);

      },
      err => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }

  getDepartamento(): void {
    
    this.signupAgricultorService.getDepartamentos().subscribe(
      data => {      
        this.Departamentos = data.sort((a: any, b: any) => b.nombreDepartamento - a.nombreDepartamento);
        console.log(this.Departamentos);  
      }       
    );
  }

  getProvincia(): void {
    
    this.signupAgricultorService.getProvincias().subscribe(
      data => {   
        this.Provincias = data.sort((a: any, b: any) => b.nombreProvincia - a.nombreProvincia);   
        console.log(data);       
      },
      err => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }

  getDistrito(): void {
    
    this.signupAgricultorService.getDistritos().subscribe(
      data => {  
        this.Distritos = data.sort((a: any, b: any) => b.nombreDistrito - a.nombreDistrito);   
        console.log(data);       
      },
      err => {
        this.message = err.error.message;
        console.log(err);
      }
    );
  }


  
}
