require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth')

const app = express()
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
