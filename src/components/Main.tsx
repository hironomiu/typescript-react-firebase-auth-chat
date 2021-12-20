import React, { FC, useState, useEffect, memo } from 'react'
import { firebaseSignOut, pushContent, messagesRef } from '../firebase'

type Props = {
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string
      displayName: string
    }>
  >
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  user: { email: string; displayName: string }
}

const Main: FC<Props> = memo((props) => {
  const [message, setMessage] = useState({
    name: props.user.displayName,
    text: '',
  })
  const [messages, setMessages] = useState([{ key: '', name: '', text: '' }])
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')

  const setText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setMessage((p) => (p = { ...message, text: e.target.value }))
    }
  }

  const signOut = () => {
    firebaseSignOut(props.setUser, props.setIsLogin)
  }

  useEffect(() => {
    setStatus('loading')
    messagesRef.on('value', (snapshot) => {
      const messages = snapshot.val()

      type Message = {
        name: string
        text: string
      }
      const entries: Array<[string, Message]> = Object.entries(messages)

      type NewMessage = {
        key: string
        name: string
        text: string
      }

      const newMessages: Array<NewMessage> = entries.map((data) => {
        const [key, message] = data

        return { key, ...message }
      })
      setMessages(newMessages)
      setStatus('idle')
    })
  }, [])

  if (status === 'loading') return <div>loading</div>

  return (
    <div>
      <button onClick={() => signOut()}>signOut</button>
      <div>
        {messages.map((message) => (
          <div key={message.key}>
            {message.name}:{message.text}
          </div>
        ))}
      </div>
      <div>
        <span>{message.name}</span>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e)}
          defaultValue={message.text}
        ></textarea>

        <button
          disabled={!message.name || !message.text}
          onClick={() => pushContent(message)}
        >
          push
        </button>
      </div>
    </div>
  )
})

export default Main
