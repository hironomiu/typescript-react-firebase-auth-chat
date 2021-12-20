import React, { FC } from 'react'
import Login from './Login'
import Main from './Main'
import Header from './Header'
import { Routes, Route } from 'react-router-dom'

type Props = {
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string
      displayName: string
    }>
  >
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  user: { email: string; displayName: string }
  isLogin: boolean
}

const Layout: FC<Props> = (props) => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              setUser={props.setUser}
              setIsLogin={props.setIsLogin}
              user={props.user}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={<Login setIsLogin={props.setIsLogin} />}
        ></Route>
      </Routes>
    </div>
  )
}

export default Layout
