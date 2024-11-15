const { Pool } = require('pg')
require('dotenv').config()

console.log('Conectando a la base de datos con los siguientes parámetros:')
console.log(`Usuario: ${process.env.DB_USER}`)
console.log(`Base de datos: ${process.env.DB_NAME}`)
console.log(`Host: ${process.env.DB_HOST}`)
console.log(`Puerto: ${process.env.DB_PORT}`)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASS), // Asegurarse de que es una cadena
  port: process.env.DB_PORT
})

module.exports = pool
