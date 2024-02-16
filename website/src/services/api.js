import.meta.env
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
  
  
export function setToken(token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
  
export function setAnonymousId(id) {
    if (id) {
        api.defaults.headers.common['user-anonymous-id'] = id
    } else {
        delete api.defaults.headers.common['user-anonymous-id']
    }
}

export default api