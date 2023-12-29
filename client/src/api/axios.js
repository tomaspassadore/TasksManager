import axios from 'axios'

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api'

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
})

export default instance
