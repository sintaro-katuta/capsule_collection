'use client'

// コンポーネントのインポート
import Header from "@/components/header"
import Menu from "@/components/menu"
import Home from "@/components/home"
import Profile from "@/components/profile"
import Search from "@/components/search"
import AccessDenied from "@/components/access_denied"
import Login from "@/components/login"

// Firebase関連
import { initializeFirebaseApp } from "@/firebase/client"
import { getAuth, getRedirectResult } from "firebase/auth";

// デバイス関連
import MobileDetect from "mobile-detect"

// React関連
import { useEffect, useState } from "react"

export default function App() {

  const [currentUser, setCurrentUser] = useState([])
  const [activeItem, setActiveItem] = useState("")
  const md = new MobileDetect(window.navigator.userAgent);

  initializeFirebaseApp()
  const auth = getAuth()

  console.log(activeItem)

  useEffect(() => {
    if (!md.mobile() || !md.tablet()) {
      // setActiveItem("access_denied")
    }
    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setCurrentUser(user)
        setActiveItem("home")
      }else{
        setActiveItem("login")
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

        {activeItem === "access_denied" && <AccessDenied />}
      </div>
      {activeItem !== "access_denied" &&
        <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
      }
    </div>
  )
}
