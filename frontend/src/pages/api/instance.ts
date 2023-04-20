import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:1707',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})