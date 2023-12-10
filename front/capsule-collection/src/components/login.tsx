// ログイン画面のコンポーネント
// React関連
import { useState } from "react"
// Firebase関連
import { firebase, initializeFirebaseApp, db } from "../firebase/client"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, setDoc, doc } from "firebase/firestore";

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
    // Firebaseの初期化
    initializeFirebaseApp()
    // ログイン情報の取得
    const auth: any = getAuth()
    // ログインするための関数
    const doLogin = (e: any) => {
        e.preventDefault()
        // firebaseAuthでログイン
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // ログインできたので画面をホーム画面に変更                
                props.setActiveItem("home")
            })
            .catch((error) => {
                alert(error);
            });
    }

    // 新規登録するための関数
    const doSignin = (e: any) => {
        e.preventDefault();
        // FirebaseAuthで新規登録
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // 新規登録時の名前の登録
                updateProfile(auth.currentUser, {
                    displayName: "ゲスト",
                    photoURL: "https://firebasestorage.googleapis.com/v0/b/capsule-collection-3ad9a.appspot.com/o/images%2FGuest.svg?alt=media&token=85e7060d-f76b-4c6b-8940-a1f54fbed59a"
                })
                // ユーザ情報
                const user = userCredential.user;
                // dbのusersのコレクションの取得
                const usersCollection = collection(db, "users");
                // dbに登録するデータ
                const data: Data = {
                    capsule: []
                }
                // 登録
                setDoc(doc(usersCollection, user.uid), data)
                // 新規登録できたのでホーム画面に変更
                props.setActiveItem("home")
            })
            .catch((error) => {
                alert(error);
            });
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
                        <button className="w-40 h-12 rounded-xl bg-button mb-5" onClick={(e: any) => doSignin(e)}>新規登録</button>
                        <p className="text-center text-blue-600" onClick={() => setLogin(!login)}>ログインの方はこちら</p>
                    </div>
                </form>
            }
        </>
    )
}