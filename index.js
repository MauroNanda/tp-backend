const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { db } = require('./db/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas (to be added)
app.use('/api/socios', require('./routes/socios.routes'));
app.use('/api/transacciones', require('./routes/transacciones.routes'));
// app.use('/api/empleados', require('./routes/empleados.routes'));
// app.use('/api/publicaciones', require('./routes/publicaciones.routes'));

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
