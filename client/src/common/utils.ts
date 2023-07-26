import axios from "axios"
import toastr from "toastr"

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(`${import.meta.env.VITE_APP_URL}token`)
}

export const isTokenAtLocalStorageExist = (): boolean => {
  return !!localStorage.getItem(`${import.meta.env.VITE_APP_URL}token`)
}

export const setTokenToLocalStorage = (token: string): void => {
  localStorage.setItem(`${import.meta.env.VITE_APP_URL}token`, token)
}

export const removeTokenFromLocalStorage = (): void => {
  localStorage.removeItem(`${import.meta.env.VITE_APP_URL}token`)
}

const throwAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    toastr.error(error.response?.data?.message || error?.message)
  }
}

export default throwAxiosError
