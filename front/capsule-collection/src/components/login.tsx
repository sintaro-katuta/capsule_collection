// ログイン画面のコンポーネント
// React関連
import axios from "axios";
import React, { useState } from "react";
// Supabase関連
import { supabase } from "@/supabase/client";

import Install from "@/components/install";

type Props = {
    setActiveItem: any;
};
export default function Login(props: Props) {
    //ログインと新規登録の画面切り替えのステート(true: login false: signin)
    const [login, setLogin] = useState(true);
    // 新規登録画面の表示のステート
    const [is_Signin, setIs_Signin] = useState<boolean>(false);
    // ユーザのメールアドレスの状態
    const [email, setEmail] = useState("");
    // ユーザのパスワードの状態
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string>("");
    // ログイン情報の取得
    let auth: any = supabase.auth;
    // ログインするための関数
    const doLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const { data, error } = await auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            setError("メールアドレスかパスワードを確認してください");
            return;
        }
        const res = await axios.post("/api/user/update/login", {
            id: data.user.id,
        });
        if (res.status === 200) {
            props.setActiveItem("home");
        } else {
            setError("ログインに失敗しました");
        }
    };

    // 新規登録するための関数
    const doSignin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const { data, error } = await auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: "ゲスト",
                    photoURL: "/profile.svg",
                },
            },
        });
        if (error) {
            console.log(error.code);
            setError(error.message);
            return;
        }
        const res = await fetch("/api/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: data.user.id,
                email: data.user.email,
                username: "ゲスト",
            }),
        });
        if (res.status === 200) {
            setIs_Signin(true);
        } else {
            setError("登録に失敗しました");
        }
    };

    return (
        <>
            <div className="h-7">
                {error && (
                    <p className="text-sm font-semibold bg-red-500 rounded-full text-white text-center">
                        {error}
                    </p>
                )}
            </div>
            {login ? (
                // ログイン画面
                <form className="w-full h-full flex flex-col gap-14 justify-center items-center">
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">メールアドレス</p>
                        <input
                            type="email"
                            className="w-full h-10 rounded-xl outline-none border border-headline px-3"
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">パスワード</p>
                        <input
                            type="password"
                            className="w-full h-10 rounded-xl outline-none border border-headline px-3"
                            onChange={(e: any) => setPassword(e.target.value)}
                        />
                    </div>
                    <Install />
                    <div>
                        <button
                            className="w-40 h-12 rounded-xl bg-button mb-5"
                            onClick={(e: any) => doLogin(e)}
                        >
                            ログイン
                        </button>
                        <p
                            className="text-center text-blue-600"
                            onClick={() => setLogin(!login)}
                        >
                            新規登録の方はこちら
                        </p>
                    </div>
                </form>
            ) : (
                // 新規登録画面
                <>
                    {is_Signin ? (
                        <div id="modal" className="block">
                            <div
                                className="block w-full h-full bg-black/70 absolute top-0 left-0 z-30"
                                onClick={() => setIs_Signin(false)}
                            >
                                <div className="w-full flex justify-center items-center">
                                    <div className="bg-headline w-3/4 h-40 rounded-xl absolute top-1/2 p-3 py-5 flex flex-col justify-center gap-8">
                                        <p className="text-lg text-white text-center">
                                            {email}
                                        </p>
                                        <p className="text-lg text-white text-center">
                                            に送られたメールを確認してください
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form className="w-full h-full flex flex-col gap-14 justify-center items-center">
                            <div className="w-full flex-col items-center justify-center">
                                <p className="text-base">メールアドレス</p>
                                <input
                                    type="email"
                                    className="w-full h-10 rounded-xl outline-none border border-headline px-3"
                                    onChange={(e: any) =>
                                        setEmail(e.target.value)
                                    }
                                />
                            </div>
                            <div className="w-full flex-col items-center justify-center">
                                <p className="text-base">パスワード</p>
                                <input
                                    type="password"
                                    className="w-full h-10 rounded-xl outline-none border border-headline px-3"
                                    onChange={(e: any) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <Install />
                            <div>
                                <button
                                    className="w-40 h-12 rounded-xl bg-button mb-5"
                                    onClick={(e: React.FormEvent) =>
                                        doSignin(e)
                                    }
                                >
                                    新規登録
                                </button>
                                <p
                                    className="text-center text-blue-600"
                                    onClick={() => setLogin(!login)}
                                >
                                    ログインの方はこちら
                                </p>
                            </div>
                        </form>
                    )}
                </>
            )}
        </>
    );
}
