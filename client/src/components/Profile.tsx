import React from "react"

import { logout } from "../reducers/auth/authSlice"
import { useAppDispatch } from "../app/hooks"
import { RouteComponentProps } from "@reach/router"

interface DefaultProps extends RouteComponentProps {
  name: string
  surname: string
  email: string
  phoneNumber: string
}

const UserProfile: React.FC<DefaultProps> = ({
  name,
  surname,
  email,
  phoneNumber,
}) => {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl font-semibold">Профіль користувача</h1>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-semibold">
            Імʼя: <i>{name}</i>
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-semibold">
            Прізвище: <i>{surname}</i>
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-semibold">
            Email: <i>{email}</i>
          </span>
        </div>
        <div className="mb-4">
          <span className="block text-sm font-semibold">
            Номер телефону: <i>{phoneNumber}</i>
          </span>
        </div>
        <button
          className="w-full bg-yellow-500 text-dark py-2 px-4 font-thin rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
          onClick={handleLogout}
        >
          Вийти
        </button>
      </div>
    </div>
  )
}

export default UserProfile
