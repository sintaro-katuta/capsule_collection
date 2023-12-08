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
  // ユーザを情報の状態
  const [currentUser, setCurrentUser] = useState<any[]>([])
  // 画面の状態 home: ホーム profile: プロフィール search: 検索 login: ログイン access_denied: pc以外の時の画面
  const [activeItem, setActiveItem] = useState<string>("")
  // カプセルの状態
  const [capsule, setCapsule]: any = useState<any[]>([])
  // モバイルかタブレットか取得
  const md = new MobileDetect(navigator.userAgent);

  // Firebaseの初期化
  initializeFirebaseApp()
  // ログイン情報を取得
  const auth = getAuth()

  // 最近のカプセルを取得する関数
  const getRecentCapsule = async (uid: string) => {
    // UsersからログインしているユーザのDocumentを取得
    const userCapsule = doc(collection(db, "users"), uid)
    // 取得したDocumentからデータを取得
    const capsulesDoc: any = await getDoc(userCapsule)
    // 取得したデータからcapsule(reference)を取得
    const capsules = capsulesDoc.data().capsule
    // capsuleにセットするための変数
    let newCapsule: any[] = []
    // 取得したデータ(Array)を回す
    capsules.forEach(async (capsule: any) => {
      // データ(reference)からcapsulesを取得
      const capsuleDoc: any = await getDoc(capsule)
      // 取得したデータを用意していた配列に追加
      newCapsule.push(capsuleDoc.data().capsule)
    })
    // 追加されたデータをセット
    setCapsule(newCapsule)
  }

  useEffect(() => {
    // pc以外からアクセスされているかチェック
    if (!md.mobile() || !md.tablet()) {
      // setActiveItem("access_denied")
    }
    const unsubscribed = auth.onAuthStateChanged((user: any) => {
      if (user) {
        // ユーザー情報をセット
        setCurrentUser(user)
        // ログイン済みユーザなのでホーム画面
        setActiveItem("home")
        // 最近のカプセルを取得
        getRecentCapsule(user.uid)
      } else {
        // ログインしていないユーザなのでログイン画面
        setActiveItem("login")
      }
      getRedirectResult(getAuth())
    })

    return () => {
      // onAuthStateChangedはfirebase.Unsubscribeを返すので、ComponentがUnmountされるタイミングでUnsubscribe(登録解除)しておく
      unsubscribed()
    }
  }, [auth])

  return (
    <div className="w-screen h-screen flex-col justify-end px-7">
      <Header />
      <div className="h-body">
        {/* 画面の状態 */}
        {activeItem === "home" && <Home capsule={capsule} />}
        {activeItem === "profile" && <Profile capsule={capsule} setActiveItem={setActiveItem} />}
        {activeItem === "search" && <Search capsule={capsule} />}
        {activeItem === "login" && <Login setActiveItem={setActiveItem} />}
        {activeItem === "access_denied" && <AccessDenied />}
      </div>
      {activeItem !== "access_denied" &&
        // 画面下のメニュー
        <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
      }
    </div>
  )
}
