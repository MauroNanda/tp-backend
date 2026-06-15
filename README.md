# TP Backend API

Este repositorio contiene la implementación de una API REST utilizando Node.js, Express y Sequelize (PostgreSQL) para la materia de Programación y Servicios Web.

## Requisitos Previos

- Node.js (v14 o superior recomendado)
- PostgreSQL
- Postman (para pruebas)

## Instalación y Configuración

1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Configurar la base de datos PostgreSQL:
   - Abrir pgAdmin o psql.
   - Crear una base de datos vacía llamada `tp_backend`.
4. Configurar las variables de entorno:
   - Copiar el archivo `.env.example` y renombrarlo a `.env`.
   - Modificar las credenciales en `.env` para que coincidan con su instalación local de PostgreSQL (usuario, contraseña y puerto).

## Ejecución del Servidor

Para iniciar el servidor en modo desarrollo (con recarga automática mediante nodemon), ejecute:
```bash
npm run dev
```

Para iniciar el servidor en modo producción, ejecute:
```bash
npm start
```

El servidor se ejecutará de forma predeterminada en el puerto 3000 (`http://localhost:3000`). Al iniciar, Sequelize sincronizará automáticamente los modelos y creará las tablas necesarias en la base de datos si no existen.
