import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? "https://memome-backend.vercel.app" : "http://localhost:1707"

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})