require('dotenv').config()

console.log('Variables de entorno:')
console.log(process.env)
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')

const app = express()

// Habilitar CORS para todas las solicitudes
app.use(cors())

app.use(express.json())
app.use('/api/auth', authRoutes)

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la sala de cine')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
