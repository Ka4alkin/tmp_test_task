import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
interface DefaultProps extends RouteComponentProps {}
const NotFound: FC<DefaultProps> = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-4xl font-bold mb-4">404 Not Found</h2>
      <p className="text-lg text-gray-600">
        The page you are looking for could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
