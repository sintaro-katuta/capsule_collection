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
import { initializeFirebaseApp, db } from "@/firebase/client"
import { getAuth, getRedirectResult } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore"

// デバイス関連
import MobileDetect from "mobile-detect"

// React関連
import { useEffect, useState } from "react"

export default function App() {

  const [currentUser, setCurrentUser] = useState([])
  const [activeItem, setActiveItem] = useState("")
  const [capsule, setCapsule]: any = useState([])
  const md = new MobileDetect(navigator.userAgent);

  initializeFirebaseApp()
  const auth = getAuth()

  const getRecentCapsule = async () => {
    const capusules: any = await getDocs(collection(db, "capsules"))
    let newCapsule: any = []

    capusules.forEach((element: any) => {
      newCapsule.push(element.data().capsule)
    })
    console.log(newCapsule)
    const category = getDoc(newCapsule[0].category)
    console.log((await category).data())
    setCapsule(newCapsule)
  }

  useEffect(() => {
    if (!md.mobile() || !md.tablet()) {
      // setActiveItem("access_denied")
    }
    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setCurrentUser(user)
        setActiveItem("home")
        getRecentCapsule()
      } else {
        setActiveItem("login")
      }
      getRedirectResult(getAuth())
    })

    return () => {
      // onAuthStateChangedはfirebase.Unsubscribeを返すので、ComponentがUnmountされるタイミングでUnsubscribe(登録解除)しておく
      unsubscribed()
    }
  }, [auth])

  // const capsule = [
  //   { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  //   { 'name': 'ちぃかわ', 'image': '/chii.svg' },
  //   { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  //   { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  //   { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  //   { 'name': 'ちぃかわ', 'image': '/chii.svg' },
  //   { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  //   { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  // ]

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
