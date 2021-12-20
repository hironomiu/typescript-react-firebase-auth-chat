import React, { FC, memo } from 'react'
import { githubProvider, socialMediaAuth, GithubProvider } from '../firebase'

type Props = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const Login: FC<Props> = memo((props) => {
  const signIn = async (provider: GithubProvider) => {
    const res = await socialMediaAuth(provider)
    if (res?.displayName) {
      props.setIsLogin(true)
    }
  }

  return (
    <div>
      <button onClick={() => signIn(githubProvider)}>GitHub</button>
    </div>
  )
})
