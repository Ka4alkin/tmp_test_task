import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/store"
import axiosInstance from "../../api/axiosInstance"
import { routesConfig } from "../../common/constants"
import User, { AuthState } from "./interfaces"
import toastr from "toastr"
import { navigate } from "@reach/router"
import throwAxiosError, {
  removeTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "../../common/utils"

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
      localStorage.removeItem(`${import.meta.env.VITE_APP_URL}token`)
      navigate("/signin-with-password")
      toastr.success("Ви успішно вийшли!")
    },
  },
})

export const { login, logout } = authSlice.actions
export const selectUser = (state: RootState) => state.user

export default authSlice.reducer
export const signupUser =
  (data: User): AppThunk =>
  async () => {
    try {
      await axiosInstance.post<User>(routesConfig.USER_SIGNUP, data)
      await navigate("/signin-with-password")
      toastr.success("Ви успішно зареєструвались!")
    } catch (error) {
      removeTokenFromLocalStorage()
      localStorage.removeItem(`${import.meta.env.VITE_APP_URL}token`)
      throwAxiosError(error)
    }
  }

export const loginUser =
  (data: Partial<User>): AppThunk =>
  async (dispatch) => {
    try {
      const response: any = await axiosInstance.post<User>(
        routesConfig.USER_LOGIN,
        data,
      )
      setTokenToLocalStorage(response.data?.token)
      const getMeResponse = await axiosInstance.get<User>(routesConfig.GET_ME)
      dispatch(login(getMeResponse.data))
      toastr.success("Ви успішно увійшли!")
      await navigate("/profile")
    } catch (error) {
      removeTokenFromLocalStorage()
      throwAxiosError(error)
    }
  }

export const getMe = (): AppThunk => async (dispatch) => {
  try {
    const response = await axiosInstance.get<User>(routesConfig.GET_ME)
    dispatch(login(response.data))
  } catch (error) {
    if (error instanceof Error) {
    }
  }
}
