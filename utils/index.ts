import Axios from 'axios'

Axios.defaults.baseURL = 'http://localhost:3001'

export const isSSR = typeof window === 'undefined'

export const API = Axios
