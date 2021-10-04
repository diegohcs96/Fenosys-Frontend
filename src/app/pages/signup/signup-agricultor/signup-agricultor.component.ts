import { ChangeDetectorRef, Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data, map } from 'jquery';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { CustomValidators } from '../../tools/custom-validators';
import { SignupAgricultor } from './signup-agricultor';
import { SignupAgricultorService } from './signup-agricultor.service';
declare const $: any;

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
    private signupAgricultorService: SignupAgricultorService,
    private fb: FormBuilder,
    private router: Router,
    private cd: ChangeDetectorRef) { }


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

  SignUpAgricultor(): void {

    var agricultor: SignupAgricultor = {
      nombreUsuario: this.agricultorSignupForm.controls['nombreUsuario'].value,
      apellidoUsuario: this.agricultorSignupForm.controls['apellidoUsuario'].value,
      distritoUsuario: this.agricultorSignupForm.controls['distritoUsuario'].value,
      emailUsuario: this.agricultorSignupForm.controls['emailUsuario'].value,
      usernameUsuario: this.agricultorSignupForm.controls['usernameUsuario'].value,
      passwordUsuario: this.agricultorSignupForm.controls['passwordUsuario'].value,
    }


    this.signupAgricultorService.SignUpAgricultor(agricultor, this.subirFotoPerfil()).subscribe(
      data => {
        console.log(data);
        window.location.href = '/signin/agricultor'
      },
      err => {
        this.alert = true;
        this.message = err.error.message;
        ;
      }
    )


  }

  //Ubicacion
  getPais(): void {

    this.signupAgricultorService.getPaises().subscribe(
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

    this.signupAgricultorService.getDepartamentos(this.idPaisSelect).subscribe(
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
    this.signupAgricultorService.getProvincias(this.idDepartamentoSelect).subscribe(
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


    this.signupAgricultorService.getDistritos(this.idProvinciaSelect).subscribe(
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
