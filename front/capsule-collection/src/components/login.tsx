// ログイン画面のコンポーネント
// React関連
import React, { useState } from "react"
// Supabase関連
import { supabase } from "@/supabase/client"


type Props = {
    setActiveItem: (any)
}

type Data = {
    capsule: any[]
}

export default function Login(props: Props) {
    //ログインと新規登録の画面切り替えのステート(true: login false: signin)
    const [login, setLogin] = useState(true)
    // ユーザのメールアドレスの状態
    const [email, setEmail] = useState('')
    // ユーザのパスワードの状態
    const [password, setPassword] = useState('')
    // ログイン情報の取得
    const auth: any = supabase.auth
    // ログインするための関数
    const doLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const { data, error } = await auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            alert(error)
            return
        }
        const res = await fetch('/api/user/update/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.user.id,
            }),
        })
        console.log(res)
    }

    // 新規登録するための関数
    const doSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        const { data, error } = await auth.signUp({
            email: email,
            password: password,
        })
        auth.updateUser({
            data: {
                name: "ゲスト",
                photoURL: "https://zwcrhekpnetxinygmzbf.supabase.co/storage/v1/object/sign/user_icon/profile.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ1c2VyX2ljb24vcHJvZmlsZS5zdmciLCJpYXQiOjE3MDI3Nzg0NjYsImV4cCI6MTcwNTM3MDQ2Nn0.4Mphk4-Xc4eLrBr4gvomqyUzBCc6MATFPEBvny4osRA&t=2023-12-17T02%3A01%3A06.798Z",
            }
        })
        if (error) {
            alert(error)
            return
        }
        const res = await fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.user.id,
                email: data.user.email,
                username: "ゲスト",
            }),
        })
        console.log(res)
    }

    return (
        <>
            {login
                // ログイン画面
                ?
                <form className="w-full h-full flex flex-col gap-14 justify-center items-center">
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">メールアドレス</p>
                        <input type="email" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setEmail(e.target.value)} />
                    </div>
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">パスワード</p>
                        <input type="password" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className="w-40 h-12 rounded-xl bg-button mb-5" onClick={(e: any) => doLogin(e)}>ログイン</button>
                        <p className="text-center text-blue-600" onClick={() => setLogin(!login)}>新規登録の方はこちら</p>
                    </div>
                </form>
                // 新規登録画面
                :
                <form className="w-full h-full flex flex-col gap-14 justify-center items-center">
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">メールアドレス</p>
                        <input type="email" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setEmail(e.target.value)} />
                    </div>
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">パスワード</p>
                        <input type="password" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className="w-40 h-12 rounded-xl bg-button mb-5" onClick={(e: React.FormEvent) => doSignin(e)}>新規登録</button>
                        <p className="text-center text-blue-600" onClick={() => setLogin(!login)}>ログインの方はこちら</p>
                    </div>
                </form>
            }
        </>
    )
}