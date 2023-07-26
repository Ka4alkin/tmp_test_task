import React, { ChangeEvent, FC, FormEvent, useState } from "react"
import { useAppDispatch } from "../app/hooks"
import { signupUser } from "../reducers/auth/authSlice"
import InputMask from "react-input-mask"
import { RouteComponentProps } from "@reach/router"
import toastr from "toastr"

interface DefaultProps extends RouteComponentProps {
  // todo
}

// todo move all inputs to seperate components as at SignInWithPassword cp regarding dry pr. and reuse
const SignUp: FC<DefaultProps> = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const dispatch = useAppDispatch()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maskedPhoneNumber = e.target.value
    const phoneNumber = maskedPhoneNumber.replace(/\D/g, "")

    setPhoneNumber(`+${phoneNumber}`)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password.length < 5) {
      toastr.warning("Пароль повинен містити принаймні 5 символів")
      return
    }

    if (!/[A-Z]/.test(password)) {
      toastr.warning("Пароль повинен містити принаймні 1 велику літеру")

      return
    }

    if (password !== confirmPassword) {
      toastr.warning("Паролі не співпадають!")
      return
    }

    dispatch(
      signupUser({
        email,
        password,
        name: firstName,
        surname: lastName,
        phoneNumber,
      }),
    )
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="grid grid-cols-1 gap-4">
          <header className="text-center py-6">
            <h2 className="text-3xl font-semibold">Реєстрація</h2>
          </header>
          <form className="bg-gray-100 p-8 rounded" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-bold mb-2"
              >
                Ім'я
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Ім'я"
                minLength={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-bold mb-2"
              >
                Прізвище
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Прізвище"
                minLength={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-gray-700 font-bold mb-2"
              >
                Номер телефону
              </label>
              <InputMask
                mask="+380 (99) 999-99-99"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+380"
                min={13}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Пароль
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Введіть пароль"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Підтвердження паролю
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Підтвердіть пароль"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-dark py-2 px-4 font-thin rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
            >
              Зареєструватися
            </button>
            <p className="mt-6">
              <span className="mb-6 inline-block align-baseline text-dark-500">
                Вже маєте обліковий запис?
              </span>{" "}
              <a
                href="/signin-with-password"
                className="text-yellow-500 font-bold hover:text-yellow-700"
              >
                Увійти
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
