# API-RESTFUL de Pinturas

## Descripción

Esta API permite gestionar una base de datos de pinturas, ofreciendo funcionalidades para crear, leer, actualizar y eliminar tanto pinturas como usuarios. 

## Tecnologías Utilizadas

- **Lenguaje:** Node.js
- **Base de Datos:** PostgreSQL

## Dependencias

- prisma/client: 5.16.1
- bcrypt: 5.1.1
- cors: 2.8.5
- dotenv: 16.4.5
- express: 4.19.2
- express-jwt: 8.4.1
- express-validator: 7.1.0
- helmet: 7.1.0
- joi: 17.13.3
- jsonwebtoken: 9.0.2
- prisma: 5.16.1

## Endpoints

### Pinturas

- **GET /api/paintings**
  - Obtiene todas las pinturas de la base de datos.
  - Acceso: `USER`, `ADMIN`

- **GET /api/paintings/:id**
  - Obtiene la pintura con el id indicado de la base de datos.
  - Acceso: `USER`, `ADMIN`

- **POST /api/paintings**
  - Crea una nueva pintura en la base de datos.
  - Acceso: `ADMIN`

- **PATCH /api/paintings/:id**
  - Modifica los datos de la pintura con el id indicado en la base de datos.
  - Acceso: `ADMIN`

- **DELETE /api/paintings/:id**
  - Elimina la pintura con el id indicado de la base de datos.
  - Acceso: `ADMIN`

### Usuarios

- **POST /api/register**
  - Crea un nuevo usuario en la base de datos.

- **POST /api/login**
  - Maneja el inicio de sesión de un usuario registrado en la base de datos.

- **GET /api/profile/:id**
  - Obtiene los datos de un usuario a partir del id de la base de datos.
  - Acceso: `ADMIN`

### Pinturas Guardadas por Usuarios

- **POST /api/painting-saved**
  - Guarda una pintura asociada a un usuario.
  - Acceso: `USER`, `ADMIN`

- **GET /api/painting-saved/:id**
  - Devuelve todas las pinturas guardadas por un usuario.
  - Acceso: `USER`, `ADMIN`
