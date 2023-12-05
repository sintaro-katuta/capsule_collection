'use client'

// コンポーネントのインポート
import Header from "@/components/header"
import Menu from "@/components/menu"
import Home from "@/components/home"
import Profile from "@/components/profile"
import Search from "@/components/search"
import Login from "@/components/login"

// Firebase関連
import { initializeFirebaseApp } from "@/firebase/client"
import { getAuth, getRedirectResult } from "firebase/auth";

// React関連
import { useEffect, useState } from "react"

export default function App() {
  initializeFirebaseApp()
  const auth = getAuth()
  console.log(auth)
  const [currentUser, setCurrentUser] = useState([])
  const [activeItem, setActiveItem] = useState("")

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      setActiveItem("login")
      if (user) {
        setCurrentUser(user)
        setActiveItem("home")
      }
      getRedirectResult(getAuth())
    })
    return () => {
      // onAuthStateChangedはfirebase.Unsubscribeを返すので、ComponentがUnmountされるタイミングでUnsubscribe(登録解除)しておく
      unsubscribed()
    }
  }, [auth])

  const capsule = [
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  ]

  return (
    <div className="w-screen h-screen flex-col justify-end px-7">
      <Header />
      <div className="h-body">
        {activeItem === "home" && <Home capsule={capsule} />}

        {activeItem === "profile" && <Profile capsule={capsule} setActiveItem={setActiveItem} />}

        {activeItem === "search" && <Search capsule={capsule} />}

        {activeItem === "login" && <Login setActiveItem={setActiveItem} />}
      </div>
      <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
    </div>
  )
}
