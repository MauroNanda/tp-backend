const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const { db } = require('./db/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/socios', require('./routes/socios.routes'));
app.use('/api/transacciones', require('./routes/transacciones.routes'));
app.use('/api/empleados', require('./routes/empleados.routes'));
app.use('/api/publicaciones', require('./routes/publicaciones.routes'));

// Swagger setup
const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'TP Backend API', version: '1.0.0' },
  },
  apis: ['./routes/*.js'],
};
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await db.authenticate();
    await db.sync({ alter: true }); // Sync models
    console.log('Database connected.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
});
