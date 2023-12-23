// プロフィール画面のコンポーネント
// コンポーネント関連
import ProfileIcon from "./profile_icon"
import Mystamp from "./mystamp"
import Loading from "./loading"
// React関連
import { useEffect, useState } from "react"
// Supabase関連
import { supabase } from "@/supabase/client"

export default function Profile(props: any) {

    const [user, setUser] = useState<any>({})
    // ログインしているユーザの情報
    const [is_logout, setIs_logout] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [capsule, setCapsule] = useState<any>([])

    const auth: any = supabase.auth
    // ログアウトするための関数
    const logout = () => {
        // ログイン画面に戻る
        props.setActiveItem("login")
        // FirebaseAuthでログアウト
        auth.signOut(auth)
    }

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await auth.getUser()
            console.log(user)
            const { data, error } = await supabase.storage.from('user_icon').createSignedUrl(`${user.user_metadata.photoURL}`, 3600)
            if(data){
                const userData = {
                    uid: user.id,
                    name: user.user_metadata.name,
                    icon: data.signedUrl
                
                }
                setUser(userData)
                setLoading(false)
            }
        }
        setLoading(true)
        getUser()
    }, [auth, props])
    

    return (
        <>
            {loading
            ?
            <Loading />
            :
            <>
                <div className="absolute top-4 -right-0 px-7">
                    <p className="text-sm text-white bg-red-500 text-center font-semibold rounded-lg tracking-wide p-1 cursor-pointer" onClick={() => setIs_logout(true)}>ログアウト</p>
                </div>
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
                <ProfileIcon uid={user.uid} name={user.name} icon={user.icon} />
                {/* ユーザの持っているカプセルを表示するコンポーネント */}
                <Mystamp capsule={capsule} />
            </>
            }
        </>
    )
}