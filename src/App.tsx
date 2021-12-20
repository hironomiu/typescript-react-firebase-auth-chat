import { useEffect, useState, VFC } from 'react'
import { onAuthStateChangedCheck } from './firebase'
import { Layout } from './components/Layout'
import { BrowserRouter } from 'react-router-dom'

const App: VFC = () => {
  const [user, setUser] = useState({ email: '', displayName: '' })
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')

  useEffect(() => {
    onAuthStateChangedCheck(setUser, setStatus, setIsLogin)
  }, [])

  if (status === 'loading') return <div>loading</div>

  return (
    <div>
      <BrowserRouter>
        <Layout
          setUser={setUser}
          setIsLogin={setIsLogin}
          user={user}
          isLogin={isLogin}
        />
      </BrowserRouter>
    </div>
  )
}

export default App
