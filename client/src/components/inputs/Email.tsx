import React, { ChangeEvent, FC } from "react"

interface DefaultProps {
  email: string
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const InputEmail: FC<DefaultProps> = ({ email, handleEmailChange }) => {
  return (
    <div className="mb-4 ">
      <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
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
  )
}

export default InputEmail
