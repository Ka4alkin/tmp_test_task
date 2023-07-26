import React, { useEffect } from "react"
import { Redirect, Router } from "@reach/router"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { getMe, selectUser } from "./reducers/auth/authSlice"
import NotFound from "./components/NotFound"
import Signup from "./components/Signup"
import SignInWithPassword from "./components/SignInWithPassword"
import Profile from "./components/Profile"
import User from "./reducers/auth/interfaces"

import "toastr/build/toastr.min.css"
import { isTokenAtLocalStorageExist } from "./common/utils"

const App = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUser)

  useEffect(() => {
    if (!isTokenAtLocalStorageExist() || !user) dispatch(getMe())
  }, [dispatch])

  return (
    <div className="bg-gray-100">
      <Router>
        <Redirect
          from="/"
          to={
            isTokenAtLocalStorageExist() || user
              ? "/profile"
              : "/signin-with-password"
          }
          noThrow
        />

        {!user ? (
          <>
            <Signup path="/signup" />
            <SignInWithPassword path="/signin-with-password" />
          </>
        ) : (
          <Profile {...(user as User)} path="/profile" />
        )}

        <NotFound default />
      </Router>
    </div>
  )
}

export default App
