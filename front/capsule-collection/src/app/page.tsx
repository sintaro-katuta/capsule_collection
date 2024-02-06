'use client'

// コンポーネントのインポート
import Header from "@/components/header"
import Menu from "@/components/menu"
import Home from "@/components/home"
import Profile from "@/components/profile"
import Search from "@/components/search"
import AccessDenied from "@/components/access_denied"
import Login from "@/components/login"
import Add_Input from "@/components/add_input"
import Install from "@/components/install"
import Qr_Camera from "@/components/qr_camera"
import Admin from "@/components/admin"

// Supabase関連
import { supabase } from "@/supabase/client"

// デバイス関連
import MobileDetect from "mobile-detect"

// React関連
import { useEffect, useState } from "react"

export default function App() {
  // 画面の状態 home: ホーム profile: プロフィール search: 検索 login: ログイン access_denied: pc以外の時の画面
  const [activeItem, setActiveItem] = useState<string>("")
  // ログイン情報の状態
  const [session, setSession] = useState(null)
  // ログイン情報を取得
  const auth: any = supabase.auth

  //session処理の実行中は画面を表示しないようにする
  useEffect(() => {
    setSession(auth.getSession())
    const { data: authData } = auth.onAuthStateChange((_event: string, session: any) => {
      setSession(session)
    })
    // リスナーの解除
    return () => authData.subscription.unsubscribe()
  }, [auth])

  //sessionが変更されたらユーザー情報を取得する
  useEffect(() => {
    // モバイルかタブレットか取得
    const md = new MobileDetect(navigator.userAgent)
    if (md.mobile() === null && md.tablet() === null) {
      setActiveItem("access_denied")
    }
  }, [activeItem])

  useEffect(() => {
    if(session){
      setActiveItem("install")
    }else{
      setActiveItem("login")
    }
  }, [session])

  return (
    <div className={"w-screen h-screen fixed"}>
      <Header />
      <div className="w-full h-9/12 px-7">
        <div className="w-full h-full">
              {activeItem === "home" && <Home setActiveItem={setActiveItem} />}
              {activeItem === "profile" && <Profile setActiveItem={setActiveItem} />}
              {activeItem === "search" && <Search />}
              {activeItem === "add_input" && <Add_Input setActiveItem={setActiveItem} />}
              {activeItem === "qr_camera" && <Qr_Camera setActiveItem={setActiveItem} />}
              {activeItem === "admin" && <Admin />}
              {activeItem === "login" && <Login setActiveItem={setActiveItem} />}
              {activeItem === "access_denied" && <AccessDenied />}
        </div>
      </div>
      {activeItem !== "access_denied" &&
        // 画面下のメニュー
        <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
      }
    </div>
  )
}
