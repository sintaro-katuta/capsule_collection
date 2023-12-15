'use client'

// コンポーネントのインポート
import Header from "@/components/header"
import Menu from "@/components/menu"
import Home from "@/components/home"
import Profile from "@/components/profile"
import Search from "@/components/search"
import AccessDenied from "@/components/access_denied"
import Login from "@/components/login"
import Loading from "@/components/loading"

// Firebase関連
import { initializeFirebaseApp, db } from "@/firebase/client"
import { getAuth, getRedirectResult } from "firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore"

// Supabase関連
import { supabase } from "@/supabase/client"
import { Session } from "@supabase/supabase-js"

// デバイス関連
import MobileDetect from "mobile-detect"

// React関連
import { useEffect, useState } from "react"

export default function App() {
  // ユーザを情報の状態
  const [currentUser, setCurrentUser] = useState<any>([])
  // 画面の状態 home: ホーム profile: プロフィール search: 検索 login: ログイン access_denied: pc以外の時の画面
  const [activeItem, setActiveItem] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  // カプセルの状態
  const [capsule, setCapsule]: any = useState<any>([])

  const [session, setSession] = useState<Session>(null)

  // モバイルかタブレットか取得
  const md = new MobileDetect(navigator.userAgent);
  // ログイン情報を取得
  const auth: any = supabase.auth
  // Firebaseの初期化
  initializeFirebaseApp()

  // 最近のカプセルを取得する関数
  const getRecentCapsule = async (uid: string) => {
    // UsersからログインしているユーザのDocument取得したDocumentからデータを取得
    const capsulesDoc: any = await getDoc(doc(collection(db, "users"), uid))

    // 取得したデータからcapsule[](reference)を取得
    const capsules: any[] = capsulesDoc.data().capsule

    // capsuleにセットするための変数
    let newCapsule: any[] = []

    // 取得したデータ(Array)を回す
    capsules.forEach(async (capsule: any) => {
      // データ(reference)からcapsulesを取得
      const capsuleDoc: any = await getDoc(capsule)
      // 取得したデータを用意していた配列に追加
      newCapsule.push(capsuleDoc.data())
    })
    return newCapsule
  }

  // useEffect(() => {
  //   const unsubscribed = auth.onAuthStateChange(async (user: any) => {
  //     if (user) {
  //       // ユーザー情報をセット
  //       setCurrentUser(user)
  //       console.log("setCurrentUser")
  //       // 最近のカプセルを取得setCapsule(getRecentCapsule(currentUser.uid))
  //       getRecentCapsule(user.uid)
  //         .then((data) => {
  //           setCapsule(data)
  //         })
  //         .finally(() => {
  //           console.log("end")
  //           setActiveItem("home")
  //           setLoading(false)
  //         })
  //       console.log(capsule)
  //     } else {
  //       // ログインしていないユーザなのでログイン画面
  //       setActiveItem("login")
  //       setLoading(false)
  //     }
  //   })
  //   return () => {
  //     unsubscribed()
  //   }
  // }, [auth])

  //session処理の実行中は画面を表示しないようにする
  useEffect(() => {
    let mounted = true
      ; (async () => {
        const { data: { session } } = await auth.getSession()
        if (mounted) {
          if (session) {
            setSession(session)
          }
          setLoading(false)
        }
      })()
    const { data: { subscription },
    } = auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (_event === "SIGNED_OUT") {
        setSession(null)
      }
    })
    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <div className="w-screen h-screen fixed">
      <Header />
      <div className="w-full h-full px-7">
        <div className="h-body">
          {loading
            ?
            <Loading />
            :
            <>
              {activeItem === "home" && <Home capsule={capsule} />}
              {activeItem === "profile" && <Profile capsule={capsule} setActiveItem={setActiveItem} />}
              {activeItem === "search" && <Search capsule={capsule} />}
              {activeItem === "login" && <Login setActiveItem={setActiveItem} />}
              {activeItem === "access_denied" && <AccessDenied />}
              {activeItem !== "access_denied" &&
                // 画面下のメニュー
                <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}
