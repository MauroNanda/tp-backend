# Documentación Funcional y Expansión

La API está dividida en tres módulos principales basados en los requerimientos del trabajo práctico. A continuación se detalla su funcionalidad, un ejemplo de uso y posibles expansiones.

## Módulos de la API

### 1. Socios (`/api/socios`)
Gestiona la información de los socios de la plataforma.
- **Alta:** `POST /`
- **Listado:** `GET /`
- **Activos:** `GET /activos`
- **Modificación:** `PUT /:id`
- **Baja Física:** `DELETE /:id`

### 2. Transacciones (`/api/transacciones`)
Actúa como un log de operaciones de traducción o transferencia entre idiomas.
- **Alta:** `POST /`
- **Listado General:** `GET /`
- **Historial por Email:** `GET /historial/:email`
- **Filtro por Idiomas:** `GET /filtrar/:origen/:destino`

### 3. Empleados y Publicaciones (`/api/empleados` y `/api/publicaciones`)
Gestiona a los empleados y las publicaciones que estos realizan (Relación 1 a N).
- **Empleados:** Alta (`POST /`) y Listado (`GET /`, `GET /:id`).
- **Publicaciones:**
  - Alta asignando el ID del empleado (`POST /`).
  - Búsqueda combinada por título y vigencia (`POST /buscar` o `GET /buscar`).
  - Modificación y Baja (`PUT /:id`, `DELETE /:id`).

---

## Ejemplo de Flujo Completo de Uso (Cliente)

A continuación se describe un flujo de uso típico para el módulo de Empleados y Publicaciones:

1. **Registrar un Empleado:**
   Se envía una petición `POST` a `/api/empleados` con los datos del empleado (nombre, apellido, dni, email). El sistema responde con el registro creado, el cual recibe un ID único (por ejemplo, `id: 1`).

2. **Crear una Publicación:**
   Se envía una petición `POST` a `/api/publicaciones` con los datos de la noticia (título, contenido, fecha). En el cuerpo de la petición se incluye la propiedad `empleado: 1` para vincular esta publicación al empleado creado en el paso anterior.

3. **Consultar el Listado:**
   Se envía una petición `GET` a `/api/publicaciones`. El sistema devuelve todas las publicaciones, y dentro de cada una, un objeto anidado con los datos del empleado autor (nombre, apellido, email).

4. **Buscar Publicaciones Específicas:**
   Si se desea buscar la noticia anterior, se envía un `POST` a `/api/publicaciones/buscar` enviando en el cuerpo un fragmento del título y el estado de vigencia.

---

## Propuestas de Expansión Horizontal

El sistema actual puede expandirse horizontalmente agregando nuevos módulos. Ejemplos de nuevas entidades:
1. **Departamentos:** Para agrupar empleados.
2. **Categorías:** Para clasificar publicaciones.
3. **Comentarios:** Para que los socios opinen en las publicaciones.

### Guía Paso a Paso: Cómo implementar una Expansión (Ejemplo: Departamentos)

Para agregar una nueva entidad (como `Departamento`) y relacionarla con `Empleado`, un desarrollador debe seguir este flujo completo:

#### Paso 1: Crear el Modelo (`models/Departamento.js`)
Se define la estructura de la tabla utilizando Sequelize:
```javascript
const { DataTypes } = require('sequelize');
const { db } = require('../db/config');

const Departamento = db.define('Departamento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ciudad: {
    type: DataTypes.STRING
  }
});

module.exports = Departamento;
```

#### Paso 2: Establecer Relaciones (en `models/Empleado.js`)
Se importa el nuevo modelo y se definen las relaciones `hasMany` (tiene muchos) y `belongsTo` (pertenece a):
```javascript
// Al final del archivo Empleado.js
const Departamento = require('./Departamento');

Departamento.hasMany(Empleado, { foreignKey: 'departamentoId' });
Empleado.belongsTo(Departamento, { foreignKey: 'departamentoId' });
```

#### Paso 3: Crear el Controlador (`controllers/departamentos.controller.js`)
Se escriben las funciones para manejar las peticiones (crear, leer, actualizar, eliminar):
```javascript
const Departamento = require('../models/Departamento');

const createDepartamento = async (req, res) => {
  const depto = await Departamento.create(req.body);
  res.json(depto);
};

// ... exportar funciones
```

#### Paso 4: Crear las Rutas (`routes/departamentos.routes.js`)
Se mapean las URLs HTTP a las funciones del controlador:
```javascript
const { Router } = require('express');
const { createDepartamento } = require('../controllers/departamentos.controller');

const router = Router();
router.post('/', createDepartamento);

module.exports = router;
```

#### Paso 5: Registrar la Ruta en el Servidor (`index.js`)
Finalmente, se conecta el nuevo archivo de rutas a la aplicación principal de Express:
```javascript
// Dentro de index.js, en la sección de rutas:
app.use('/api/departamentos', require('./routes/departamentos.routes'));
```

**Nota sobre la Base de Datos:** Como en `index.js` tenemos la línea `await db.sync({ alter: true });`, Sequelize detectará automáticamente el nuevo modelo al reiniciar el servidor y ejecutará la sentencia SQL `CREATE TABLE "Departamentos"...` por nosotros.
