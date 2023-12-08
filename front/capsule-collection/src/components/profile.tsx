// プロフィール画面のコンポーネント
// コンポーネント関連
import ProfileIcon from "./profile_icon"
import Mystamp from "./mystamp"
// React関連
import { useEffect, useState } from "react"
// Firebase関連
import { getAuth, signOut } from "firebase/auth";

export default function Profile(props: any) {
    // ログイン情報を取得
    const auth: any = getAuth()
    // ユーザの名前の状態
    const [name, setName] = useState<string>("")
    // ログインしているユーザの情報
    const [is_logout, setIs_logout] = useState<boolean>(false)
    // ログアウトするための関数
    const logout = () => {
        // FirebaseAuthでログアウト
        signOut(auth)
        // ログアウトしたのでログイン画面へ変更
        props.setActiveItem("login")
    }

    useEffect(() => {
        const user: any = auth.currentUser
        setName(user.displayName)
    }, [auth])

    return (
        <>
            <div className="absolute top-4 -right-0 px-7">
                <p className="text-sm text-white bg-red-500 text-center font-semibold rounded-lg tracking-wide p-1" onClick={() => setIs_logout(true)}>ログアウト</p>
            </div>
            {/* ログインが押された時に表示されるモーダル */}
            {is_logout &&
                <div id="modal" className="block">
                    <div className="block w-full h-full bg-black/70 absolute top-0 left-0 z-30">
                        <a href="#" className="flex justify-center w-full h-full cursor-default"></a>
                        <div className='w-full flex justify-center items-center'>
                            <div className='bg-headline w-3/4 h-40 rounded-xl absolute top-1/2 p-3 py-5 flex flex-col justify-center gap-8'>
                                <p className='text-lg text-white text-center'>ログアウトしますか？</p>
                                <div className='flex justify-center gap-3'>
                                    <button className='bg-gray-300 rounded-lg p-1' onClick={() => setIs_logout(false)}>キャンセル</button>
                                    <button className='bg-red-500 rounded-lg p-1' onClick={() => logout()}>ログアウト</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* ユーザのアイコンを表示するコンポーネント */}
            <ProfileIcon name={name} />
            {/* ユーザの持っているカプセルを表示するコンポーネント */}
            <Mystamp capsule={props.capsule} />
        </>
    )
}