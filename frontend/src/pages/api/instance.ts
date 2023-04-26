import axios from 'axios'

const BASE_URL: string = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_URL as string : 'http://localhost:1707'

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})