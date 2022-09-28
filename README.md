# CrudIngresoPersonas

-Crud Ingreso de Personas 

-Tecnologías Aplicadas
-Angular
-Typescript
-Javscript
-CSS
-HTML




iniciar proyecto : 

//observable (opcional)
tsc --watch (carpeta server)

//iniciar proyecto angular
ng serve --o (consola proyecto frontend)

//iniciar bdd
nodemon dist/index.js (consola proyecto backend(carpeta server))


//datos bdd
bdd : supermercado
tabla: persona
usuario: root
password: root

endpoints (abrir en postman)

GET

localhost:6000/api/personas/
(nos retorna listado de usuarios)

GET
localhost:6000/api/personas/(inserte numero id de la persona)
(nos retorna la persona según id)

DELETE
localhost:6000/api/personas/(inserte id persona)
(nos elimina persona según su  id)

POST (SELECCIONAR raw y json)
localhost:6000/api/personas

{
   "nombre":"",
   "apellido":"",
   "correo:"",
   "tipoDocumento":"RUT o PASAPORTE",
   "documento": NUMERO DE RUT O PASAPORTE ,
   "fechaNacimiento":""
}

PUT (seleccionar raw y json , dentro de el ingresamos el json con los datos de la persona )
localhost:6000/api/personas/(id de la persona a actualizar)
{
   "nombre":"",
   "apellido":"",
   "correo":!",
   "tipoDocumento":"RUT o PASAPORTE",
   "documento": NUMERO DE RUT O PASAPORTE ,
   "fechaNacimiento":""
}

