import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
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

  //Variables de Ubicación
  Departamento: any;
  Pais: any;
  Provincia: any;
  Distrito: any;
  
  //Variables para esconder ubicación Ubicación
  ViewDepartamento = false;
  ViewProvincia = false;
  ViewDistrito = false;

  


  constructor(private tokenstorageService : TokenStorageService, 
              private signupAgricultorService : SignupAgricultorService, 
              private fb : FormBuilder,
              private router: Router,
              private cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPais();
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
      //paisUsuario : this.agricultorSignupForm.controls['paisUsuario'].value,
      //departamentoUsuario : this.agricultorSignupForm.controls['departamentoUsuario'].value,
      //provinciaUsuario : this.agricultorSignupForm.controls['provinciaUsuario'].value,
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
    
    this.signupAgricultorService.getPaises().subscribe(
      data => {      
        this.Pais = data.sort((a: any, b: any) => b.idPais - a.idPais);
        console.log(data);
      },      
    );
  }  

  ViewDep(idPais:any){

    this.ViewDistrito = false;
    this.ViewProvincia = false;

    let id = idPais.target.value;
   
      this.signupAgricultorService.getDepartamentos(id).subscribe(
        data => {      
  
          this.Departamento = data.sort((a: any, b: any) => a.idDepartamento - b.idDepartamento);
          console.log('idPais =>', id)
          console.log(this.Departamento);  
          
        }  
      );      

    this.ViewDepartamento = true;
  }

  ViewProv(idDepartamento:any){
    this.ViewDistrito = false;

    let id = idDepartamento.target.value;

    this.signupAgricultorService.getProvincias(id).subscribe(
      data => {       

        this.Provincia = data;   
        console.log('idDepartamento =>', id)
        console.log(this.Provincia); 
      },      
    );
    this.ViewProvincia = true;

  }

  ViewDist(idProvincia:any){

    let id = idProvincia.target.value;

    this.signupAgricultorService.getDistritos(id).subscribe(
      data => {  

        this.Distrito = data.sort((a: any, b: any) => a.idDistrito - b.idDistrito);   
        console.log('idProvincia =>', id)
        console.log(this.Distrito);  

      }
    );

    this.ViewDistrito = true;
  }
  
  SelectIdDistrito(idDistrito:any){
    let id = idDistrito.target.value;
    console.log(id)
  }

 /* ngAfterContentChecked(){
    this.cd.detectChanges();        
  }*/

 
  
  
}
