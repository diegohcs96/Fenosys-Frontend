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

    //Variables de Ubicación
    Departamentos: any;
    Paises: any;
    Provincias: any;
    Distritos: any;
    
    //Variables para esconder ubicación Ubicación
    ViewDepartamento = false;
    ViewProvincia = false;
    ViewDistrito = false;

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

    paisUsuario: new FormControl('', Validators.required),

    departamentoUsuario: new FormControl('', Validators.required),

    provinciaUsuario: new FormControl('', Validators.required),

    distritoUsuario: new FormControl('', Validators.required),

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



  token = localStorage.getItem('passwordresetToken');

  SignUpAdmin() : void{

    //local
    //this.token = location.href.slice(35); 
    //producción
    this.token = location.href.slice(43); 

    console.log(this.token)

    var admin: SignupAdmin = {
      nombreUsuario : this.adminSignupForm.controls['nombreUsuario'].value,
      apellidoUsuario : this.adminSignupForm.controls['apellidoUsuario'].value,
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

  //Ubicacion
  getPais(): void {
    
    this.signinAdminService.getPaises().subscribe(
      data => {      
        this.Paises = data.sort((a: any, b: any) => b.nombrePais - a.nombrePais);
        console.log(data);
      },      
    );
  }  

  ViewDep(idPais:any){

    this.ViewDistrito = false;
    this.ViewProvincia = false;

    let id = idPais.target.value;
   
      this.signinAdminService.getDepartamentos(id).subscribe(
        data => {      
  
          this.Departamentos = data.sort((a: any, b: any) => a.idDepartamento - b.idDepartamento);
          console.log('idPais =>', id)
          console.log(this.Departamentos);  
          
        }  
      );      

    this.ViewDepartamento = true;
  }

  ViewProv(idDepartamento:any){
    this.ViewDistrito = false;

    let id = idDepartamento.target.value;

    this.signinAdminService.getProvincias(id).subscribe(
      data => {       

        this.Provincias = data;   
        console.log('idDepartamento =>', id)
        console.log(this.Provincias); 
      },      
    );
    this.ViewProvincia = true;

  }

  ViewDist(idProvincia:any){

    let id = idProvincia.target.value;

    this.signinAdminService.getDistritos(id).subscribe(
      data => {  

        this.Distritos = data.sort((a: any, b: any) => a.idDistrito - b.idDistrito);   
        console.log('idProvincia =>', id)
        console.log(this.Distritos);  

      }
    );

    this.ViewDistrito = true;
  }

  SelectIdDistrito(idDistrito:any){
    let id = idDistrito.target.value;
    console.log(id)
  }
}
