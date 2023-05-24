import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
  // baseURL: 'https://api-spacetime-5lz9.onrender.com',
  // baseURL: 'https://spacetime.herokuapp.com',
})
