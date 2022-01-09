import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig)

export type GithubProvider = firebase.auth.GithubAuthProvider

export const githubProvider: firebase.auth.GithubAuthProvider =
  new firebase.auth.GithubAuthProvider()

export const socialMediaAuth = async (
  provider: firebase.auth.GithubAuthProvider
) => {
  try {
    const auth = firebase.auth()
    const data = auth.signInWithPopup(provider)
    return data.then((res) => res.user)
  } catch (err) {
    console.log(err)
  }
}

export const firebaseSignOut = (
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string
      displayName: string
    }>
  >,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const auth = firebase.auth()
    auth.signOut().then(() => {
      setIsLogin(false)
      setUser({ email: '', displayName: '' })
    })
  } catch (err) {
    console.log(err)
  }
}

export const onAuthStateChangedCheck = (
  setUser: React.Dispatch<
    React.SetStateAction<{
      email: string
      displayName: string
    }>
  >,
  setStatus: React.Dispatch<React.SetStateAction<'idle' | 'loading'>>,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
  // setMessage: React.Dispatch<
  //   React.SetStateAction<{
  //     name: string
  //     text: string
  //   }>
  // >
) => {
  setStatus('loading')
  const auth = firebase.auth()
  auth.onAuthStateChanged((user) => {
    if (user?.email && user?.displayName) {
      setUser({ email: user.email, displayName: user.displayName })
      setIsLogin(true)
      // setMessage({ name: user.displayName, text: '' })
    }
    console.log('idle')
    setStatus('idle')
  })
}

const database = firebase.database()
export const messagesRef = database.ref('messages')

type Message = {
  name: string
  text: string
}
export const pushContent = ({ name, text }: Message) =>
  messagesRef.push({ name, text })
