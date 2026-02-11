import axios from 'axios'

const API = axios.create({
  baseURL: 'https://ecoexplorer-www0.onrender.com/api', // Update if hosted elsewhere
  withCredentials: false, // If you use cookies later, set to true
})


export default API
