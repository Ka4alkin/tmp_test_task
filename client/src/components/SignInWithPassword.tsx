import React, { ChangeEvent, FC, FormEvent, useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { loginUser } from "../reducers/auth/authSlice"
import { RouteComponentProps } from "@reach/router"
import toastr from "toastr"
import InputEmail from "./inputs/Email"
import InputPassword from "./inputs/Password"

interface DefaultProps extends RouteComponentProps {
  // todo
}

const SignInWithPassword: FC<DefaultProps> = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useAppDispatch()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Додатковий код для обробки відправки форми
    if (password.length < 5) {
      toastr.warning("Пароль повинен містити принаймні 5 символів")
      return
    }

    if (!/[A-Z]/.test(password)) {
      toastr.warning("Пароль повинен містити принаймні 1 велику літеру")

      return
    }

    dispatch(loginUser({ email, password }))
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 gap-4 max-w-lg">
          <header className="text-center py-6">
            <h2 className="text-3xl font-semibold">Вхід</h2>
          </header>
          <form className="bg-gray-100 p-8 rounded" onSubmit={handleSubmit}>
            <InputEmail email={email} handleEmailChange={handleEmailChange} />
            <InputPassword
              password={password}
              handlePasswordChange={handlePasswordChange}
            />
            <a
              className="mb-6 inline-block align-baseline  text-sm text-gray-500 hover:text-gray-800"
              href="#"
            >
              Забули пароль?
            </a>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-dark py-2 px-4 font-thin rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
            >
              Увійти
            </button>
            <p className="mt-6">
              <span className="mb-6 inline-block align-baseline   text-dark-500 ">
                Немає облікового запису?
              </span>{" "}
              <a
                href="/signup"
                className="text-yellow-500 font-bold hover:text-yellow-700"
              >
                Зареєструватися
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignInWithPassword
