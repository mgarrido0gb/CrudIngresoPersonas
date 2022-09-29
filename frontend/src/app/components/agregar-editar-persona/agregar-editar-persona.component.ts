import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Persona } from 'src/app/interfaces/persona';
import { PersonaService } from 'src/app/services/persona.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-agregar-editar-persona',
  templateUrl: './agregar-editar-persona.component.html',
  styleUrls: ['./agregar-editar-persona.component.css']
})
export class AgregarEditarPersonaComponent implements OnInit {

  tipoDocumento: string[] = ['RUT','PASAPORTE'];
  form: FormGroup;
  maxDate:Date;
  loading:boolean = false;
  operacion:string = 'Agregar ';
  id : number | undefined;

  
  /*Tipos de validaciones */
    constructor(public dialogRef: MatDialogRef<AgregarEditarPersonaComponent>,
      private fb: FormBuilder, private _personaService: PersonaService,
      private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any ) { 
        this.maxDate = new Date();
        this.form = this.fb.group({
          nombre: ['',[Validators.required,Validators.maxLength(20)]],
          apellido:['',Validators.required],
          correo:['',[Validators.required,Validators.email]],
          tipoDocumento:[null,Validators.required],
          documento:[null,[Validators.required,Validators.pattern("^[0-9]*$")]],
          fechaNacimiento:[null,Validators.required]

        })
        this.id = data.id;
     
      }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  //funfion q identifica si el usuario presiono editar o agregar
  //para hacer el cambio en la interfaz
  esEditar(id : number | undefined){
    if(id !== undefined){
      this.operacion = 'Editar ';
      this.getPersona(id);
    }
  }

  getPersona(id:number){
    this._personaService.getPersona(id).subscribe(data=>{
      this.form.setValue({
        nombre : data.nombre,
        apellido : data.apellido,
        correo : data.correo,
        documento: data.documento,
        tipoDocumento : data.tipoDocumento,
        fechaNacimiento : new Date(data.fechaNacimiento)
      })
    })
  }

  cancelar(){
this.dialogRef.close();
  }
  //Agregar Persona
  addEditPersona(){

    if(this.form.invalid){
      return;
    }

    const persona: Persona = {

      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      tipoDocumento: this.form.value.tipoDocumento,
      documento: this.form.value.documento,
      fechaNacimiento: this.form.value.fechaNacimiento.toISOString().slice(0,10)

    }

    if(this.id == undefined){
      //es agregar
      this._personaService.addPersona(persona).subscribe(() =>{
        this.loading = false;
        this.mensajeExito('agregada');
        this.dialogRef.close(true);
      })
    }else{
      //es editar
      this._personaService.updatePersona(this.id,persona).subscribe(data =>{
        this.loading = false;
        this.mensajeExito('actualizada');
        this.dialogRef.close(true);
      })

    }

    this.loading = true;

   

   

  }
  mensajeExito(operacion :string){
    this._snackBar.open(`La Persona ha sido ${operacion} exitosamente`,'',{
      duration:2000
    });
  }
}
