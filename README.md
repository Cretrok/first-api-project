# First Project API

Set de endpoints de prueba para comenzar a consumir una RESTful API.

## URL actual
https://coderoom-first-api-project.now.sh

## Endpoints

`GET /:username/data`

Obtener la lista de todos los items del usuario.

`GET /:username/data/:id`

Obtener los datos del item especificado por el parámetro id.

`POST /:username/data`

Crear un item en el bucket del usuario especificado.

_Parámetros del body_

**data**. Datos a insertar en este request.
```json
{ "data": {
  "nombre": "John",
  "apellido": "Doe",
  "edad": "25"
  } 
} 
```
`PUT /:username/data/:id`

Actualizar el item seleccionado en el bucket del usuario especificado.

_Parámetros del body_

**data**. Datos con el mismo formato de tu objeto de creación.
```json
{ 
  "data": {
    "name": "Jane"
  }
} 
```

`DELETE /:username/data/:id`

Borrar el item seleccionado del bucket del usuario especificado.

## Local Development
### Requisitos
- NodeJS

### Primeros pasos
1. Clona este repo
2. Corre `npm install`
3. Corre `npm start` para iniciar el servidor
4. Consume el servidor en `http://localhost:8000`