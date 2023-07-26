import axios from "axios"
import { getTokenFromLocalStorage } from "../common/utils"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
  method: "GET",
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromLocalStorage()

    if (token) config.headers["Authorization"] = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
