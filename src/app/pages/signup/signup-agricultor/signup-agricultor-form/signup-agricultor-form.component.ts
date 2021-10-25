import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/pages/tools/custom-validators';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { SignupAgricultor } from '../signup-agricultor';
import { SignupAgricultorService } from '../signup-agricultor.service';

@Component({
  selector: 'app-signup-agricultor-form',
  templateUrl: './signup-agricultor-form.component.html',
  styles: [
  ]
})
export class SignupAgricultorFormComponent implements OnInit {

  //Variables de Uso para Alerta
  alert = false;
  alert_class: any;
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

  fieldTextType: boolean | undefined;
  
  constructor(
    private signupagricultorService: SignupAgricultorService,
    private fb: FormBuilder,
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

  DisplayAlert() {
    this.alert = true;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
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


    this.signupagricultorService.SignUpAgricultor(agricultor).subscribe(
      data => {
        this.alert_class = 'alert alert-info bg-soft-info text-justify';
        this.message = data.message;
      },
      err => {
        this.alert_class = 'alert alert-danger text-justify';
        this.message = err.error.message;
      }
    )
  }

  //Ubicacion
  getPais(): void {
    this.signupagricultorService.getPaises().subscribe(
      data => {
        this.Paises = data.sort((a: any, b: any) => b.nombrePais - a.nombrePais);
      },
    );
  }

  ViewDep(idPais: any) {
    this.ViewDepartamento = false;
    this.ViewDistrito = false;
    this.ViewProvincia = false;

    this.idPaisSelect = idPais.target.value;

    this.signupagricultorService.getDepartamentos(this.idPaisSelect).subscribe(
      data => {
        this.Departamentos = data.sort((a: any, b: any) => a.idDepartamento - b.idDepartamento);
        this.idDepartamentoSelect == null;
      }
    );

    this.ViewDepartamento = true;
  }

  ViewProv(idDepartamento: any) {
    this.ViewProvincia = false;
    this.ViewDistrito = false;

    this.idDepartamentoSelect = idDepartamento.target.value;
    this.signupagricultorService.getProvincias(this.idDepartamentoSelect).subscribe(
      data => {
        this.Provincias = data;
        this.idProvinciaSelect == null;
      },
    );

    this.SelectProvincia = '';
    this.ViewProvincia = true;
  }

  ViewDist(idProvincia: any) {

    this.idProvinciaSelect = idProvincia.target.value;


    this.signupagricultorService.getDistritos(this.idProvinciaSelect).subscribe(
      data => {
        this.Distritos = data.sort((a: any, b: any) => a.idDistrito - b.idDistrito);
        this.idDistritoSelect = null;
      }

    );

    this.SelectDistrito = '';
    this.ViewDistrito = true;
  }

  SelectIdDistrito(idDistrito: any) {
    this.idDistritoSelect = idDistrito.target.value;
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }
}
