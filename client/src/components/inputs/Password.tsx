import React, { ChangeEvent, FC } from "react"

interface DefaultProps {
  password: string
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const InputPassword: FC<DefaultProps> = ({
  password,
  handlePasswordChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
        Пароль
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Пароль"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        value={password}
        onChange={handlePasswordChange}
        required
      />
    </div>
  )
}

export default InputPassword
