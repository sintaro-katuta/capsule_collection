import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(props: any) {
    const [login, setLogin] = useState(true) //ログインと新規登録の画面切り替えのステート(true: login false: signin)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = getAuth()

    const doLogin = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                props.setActiveItem("home")
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <>
            {login
                ?
                <form className="w-full h-full flex flex-col gap-20 justify-center items-center">
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">メールアドレス</p>
                        <input type="email" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setEmail(e.target.value)} />
                    </div>
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">パスワード</p>
                        <input type="password" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className="w-40 h-12 rounded-xl bg-button mb-5" onClick={(e) => doLogin(e)}>ログイン</button>
                        <p className="text-center text-blue-600" onClick={() => setLogin(!login)}>新規登録の方はこちら</p>
                    </div>
                </form>
                :
                <form className="w-full h-full flex flex-col gap-20 justify-center items-center">
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">メールアドレス</p>
                        <input type="email" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setEmail(e.target.value)} />
                    </div>
                    <div className="w-full flex-col items-center justify-center">
                        <p className="text-base">パスワード</p>
                        <input type="password" className="w-full h-10 rounded-xl outline-none border border-headline px-3" onChange={(e: any) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button className="w-40 h-12 rounded-xl bg-button mb-5">新規登録</button>
                        <p className="text-center text-blue-600" onClick={() => setLogin(!login)}>ログインの方はこちら</p>
                    </div>
                </form>
            }
        </>
    )
}