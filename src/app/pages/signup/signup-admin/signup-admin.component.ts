import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  token: any;

  //Variables de Ubicación
  Departamentos: any;
  Paises: any;
  Provincias: any;
  Distritos: any;

  //Variables para esconder ubicación Ubicación
  ViewDepartamento = false;
  ViewProvincia = false;
  ViewDistrito = false;

  //Variables de Seguridad en los Option
  idDistritoSelect: any;
  idProvinciaSelect: any;
  idDepartamentoSelect: any;
  idPaisSelect: any;

  SelectProvincia: any = ''
  SelectDistrito: any = ''

  constructor(private tokenstorageService: TokenStorageService,
    private signinAdminService: SignupAdminService,
    private fb: FormBuilder,
    private router: Router,
    private tokens: TokenStorageService,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getPais();
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
      Validators.maxLength(20),
      CustomValidators.patternValidator(/\d/, { passwordnumber: true }),
      CustomValidators.patternValidator(/[A-Z]/, { passworduppercase: true }),
      CustomValidators.patternValidator(/[a-z]/, { passwordsmallcase: true }),
      CustomValidators.patternValidator(/[@#*$:\^%&]/, { passwordspecialcharacter: true })
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

  SignUpAdmin(): void {

    //DEV
    //this.token = location.href.slice(35);
    //QA
    this.token = location.href.slice(43); 

    console.log(this.token)

    var admin: SignupAdmin = {
      nombreUsuario: this.adminSignupForm.controls['nombreUsuario'].value,
      apellidoUsuario: this.adminSignupForm.controls['apellidoUsuario'].value,
      distritoUsuario: this.adminSignupForm.controls['distritoUsuario'].value,
      passwordUsuario: this.adminSignupForm.controls['passwordUsuario'].value,
      requesttokenUsuario: this.token || ""
    }

    this.signinAdminService.SignUpAdmin(admin, this.subirFotoPerfil()).subscribe(
      data => {

        console.log(data);
        window.location.href = '/signin/admin'
      },
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

  ViewDep(idPais: any) {
    this.ViewDepartamento = false;
    this.ViewDistrito = false;
    this.ViewProvincia = false;

    this.idPaisSelect = idPais.target.value;

    this.signinAdminService.getDepartamentos(this.idPaisSelect).subscribe(
      data => {

        this.Departamentos = data.sort((a: any, b: any) => a.idDepartamento - b.idDepartamento);
        console.log('idPais =>', this.idPaisSelect)
        console.log(this.Departamentos);
        this.idDepartamentoSelect == null;

      }
    );

    this.ViewDepartamento = true;
  }

  ViewProv(idDepartamento: any) {
    this.ViewProvincia = false;
    this.ViewDistrito = false;



    this.idDepartamentoSelect = idDepartamento.target.value;
    this.signinAdminService.getProvincias(this.idDepartamentoSelect).subscribe(
      data => {
        this.Provincias = data;
        console.log('idDepartamento =>', this.idDepartamentoSelect)
        console.log(this.Provincias);
        this.idProvinciaSelect == null;
      },
    );

    //  this.agricultorSignupForm.controls['provinciaUsuario'].setErrors({'incorrect': true})   


    /*setTimeout (() => {
      this.agricultorSignupForm.controls['provinciaUsuario'].setErrors(null)
    }, 1000);*/


    // this.agricultorSignupForm.controls['provinciaUsuario'].setErrors(null);

    //console.log(this.agricultorSignupForm.controls['provinciaUsuario'].setErrors(null))

    //let a = this.agricultorSignupForm.controls['provinciaUsuario'].value
    //this.agricultorSignupForm.reset(a);
    this.SelectProvincia = '';
    this.ViewProvincia = true;
  }

  ViewDist(idProvincia: any) {

    this.idProvinciaSelect = idProvincia.target.value;


    this.signinAdminService.getDistritos(this.idProvinciaSelect).subscribe(
      data => {

        this.Distritos = data.sort((a: any, b: any) => a.idDistrito - b.idDistrito);
        console.log('idProvincia =>', this.idProvinciaSelect)
        console.log(this.Distritos);
        this.idDistritoSelect = null;
        console.log(this.idDistritoSelect);
      }

    );
    /*   setTimeout (() => {
         this.agricultorSignupForm.controls['distritoUsuario'].setErrors({'incorrect': true})  
       }, 100);
   
       this.agricultorSignupForm.controls['provinciaUsuario'].setErrors(null)*/


    this.SelectDistrito = '';

    this.ViewDistrito = true;
  }

  SelectIdDistrito(idDistrito: any) {

    this.idDistritoSelect = idDistrito.target.value;
    console.log(this.idDistritoSelect)
  }


  ngAfterContentChecked() {
    this.cd.detectChanges();
  }
}
