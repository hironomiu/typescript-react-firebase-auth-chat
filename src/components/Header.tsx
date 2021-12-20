import React from 'react'
import { firebaseSignOut } from '../firebase'
type Props = {
  isLogin: boolean
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string
      displayName: string
    }>
  >
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}
export const Header = (props: Props) => {
  const signOut = () => {
    firebaseSignOut(props.setUser, props.setIsLogin)
  }
  return (
    <div>
      ヘッダー
      {props.isLogin ? (
        <button onClick={() => signOut()}>SingOut</button>
      ) : null}
    </div>
  )
}
