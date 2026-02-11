import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Update if hosted elsewhere
  withCredentials: false, // If you use cookies later, set to true
})

export default API
