import { useEffect, useState, VFC } from 'react'
import { onAuthStateChangedCheck } from './firebase'
import Login from './components/Login'
import Main from './components/Main'

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
      {isLogin ? (
        <Main setUser={setUser} setIsLogin={setIsLogin} user={user} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  )
}

export default App
