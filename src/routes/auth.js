// ./routes/auth.js
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const router = express.Router()

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  console.log('Datos recibidos:', username, password)
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    )
    console.log('Usuario registrado:', result.rows[0])
    res.status(201).json({ message: 'User registered', user: result.rows[0] })
  } catch (err) {
    console.error('Error en el servidor:', err)
    res.status(500).json({ error: err.message })
  }
})

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = userResult.rows[0]
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ message: 'Login successful', token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Ruta para recibir y guardar la fecha de la película
router.post('/save-movie-date', async (req, res) => {
  const { userId, movieDate } = req.body
  try {
    // Verificar que los datos no estén vacíos
    if (!userId || !movieDate) {
      return res.status(400).json({ message: 'User ID and movie date are required' })
    }

    // Guardar la fecha en la base de datos
    const result = await pool.query(
      'INSERT INTO movie_dates (user_id, movie_date) VALUES ($1, $2) RETURNING *',
      [userId, movieDate]
    )
    res.status(201).json({ message: 'Movie date saved', movieDate: result.rows[0] })
  } catch (err) {
    console.error('Error en el servidor:', err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
