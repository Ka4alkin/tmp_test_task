import React, { FC } from "react"

interface DefaultProps {
  errorMessage: string
}

const Error: FC<DefaultProps> = ({ errorMessage }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-4 text-sm">
      <p>{errorMessage}</p>
    </div>
  )
}

export default Error
