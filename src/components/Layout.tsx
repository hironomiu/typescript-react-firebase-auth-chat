import React, { FC, useEffect } from 'react'
import { Login, Main, Header, Footer } from './'
import { Routes, Route, useNavigate } from 'react-router-dom'

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

export const Layout: FC<Props> = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (props.isLogin) navigate('/')
    else navigate('/login')
  }, [props.isLogin, navigate])

  return (
    <div>
      <Header
        isLogin={props.isLogin}
        setUser={props.setUser}
        setIsLogin={props.setIsLogin}
      ></Header>
      <Routes>
        <Route
          path="/"
          element={
            <Main
              setUser={props.setUser}
              setIsLogin={props.setIsLogin}
              user={props.user}
              isLogin={props.isLogin}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={<Login setIsLogin={props.setIsLogin} />}
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}
