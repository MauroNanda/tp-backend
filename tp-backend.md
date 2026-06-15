# PRÁCTICA BACKEND-FRONTEND
**Programación y Servicios Web**
**Facultad de Ingeniería - Universidad Nacional de Jujuy**

**OBJETIVO:** Poner en práctica los conceptos de: Arquitectura de Servicios Web con Express, establecimiento de Rutas, persistencia con Postgres, Sequelize ORM, testeo de API (Postman) y documentación.

---

## PARTE 1
Desarrolle una API que provea determinados servicios (rutas) sobre las siguientes situaciones problemáticas.

* En todos los casos debe testear todos los servicios de la API mediante alguna herramienta (ej. POSTMAN).
* Todos los puntos deben estar en UN SOLO proyecto (ej. `tp5-apellidoynombre-backend`).

---

### PTO 1) Defina el siguiente esquema en el backend y cree una API que brinde los servicios abajo indicados:

| Servicios / Rutas | Modelo: Socios |
| :--- | :--- |
| - Dar de alta un Socio (**POST**) | `nombre`: String |
| - Recuperar TODOS los Socios (**GET**) | `apellido`: String |
| - Eliminar un Socio (**DELETE**) | `foto`: String *(url de una imagen para mostrar)* |
| - Modificar un Socio (**PUT**) | `dni`: String |
| - Recuperar los socios ACTIVOS (**GET**) | `numeroSocio`: Number |
| | `activo`: Boolean *(si un socio no paga pasaría a pasivo)* |

---

### PTO 2) Defina el siguiente esquema de backend y cree una API, se desea llevar un log de sus transacciones, la API brinda los servicios abajo indicados:

| Servicios / Rutas | Modelo: Transaccion *(representa el LOG de una operación)* |
| :--- | :--- |
| - Dar de alta una Transaccion (**POST**) | `IdiomaOrigen`: String |
| - Recuperar TODAS las Transacciones Registradas (**GET**) | `TextoOrigen`: number |
| - Recuperar el histórico de transacciones de un determinado cliente (**GET**), utilizar email como clave | `IdiomaDestino`: String |
| - Recuperar TODAS las Transacciones que tengan como origen y destino los idiomas recibidos como parámetro (**GET**). Utilice el concepto de **PARAMS**. | `Texto Destino`: number |
| *Nota: Ej. es-español, fr-frances, en-ingles, etc.* | `emailCliente`: String |

---

### PTO 3) Defina una API REST que permita manejar la siguiente información:

| Servicios / Rutas | Modelos y Atributos |
| :--- | :--- |
| - Dar de alta un Empleado (**POST**) | **Empleado** |
| - Obtener todos los Empleados (**GET**) | `apellido`: String |
| - Obtener UN Empleado (**GET**) | `nombre`: String |
| | `dni`: String |
| | `email`: String |
| - Dar de alta una Publicación (**POST**) enviar al Empleado como propiedad. | **Publicación** |
| - Recuperar TODAS las publicaciones (**GET**) incluyendo la información de los empleados. | `Título`: String |
| - Eliminar una publicación (**DELETE**) | `Contenido`: String |
| - Modificar una publicación (**PUT**) | `ImagenAsociada`: String *(almacena imagen en base64)* |
| - Recuperar TODAS las Publicaciones basándose en una búsqueda combinada de los siguientes parámetros. Puede mandar los parámetros como **GET(params)** o **POST**: <br><br> * **Título**: se pasa un texto que es parte del título, no es una búsqueda exacta. <br> * **Vigente**: se pasa un booleano. | `fechaPublicación`: String *(gestionar fecha como string)* <br><br> `empleado`: Empleado <br><br> `vigente`: booleano |

---

**Ing. Espinoza Alfredo Rolando**