import ProfileIcon from "./profile_icon"
import Mystamp from "./mystamp"

import Link from 'next/link'
import { useState } from "react"

import { getAuth, signOut } from "firebase/auth";
import { tree } from "next/dist/build/templates/app-page";

export default function Profile(props: any) {
    const auth = getAuth()
    const user = auth.currentUser
    let name: any = ""

    if(user !== null){
        name = user.displayName
    }

    const [is_logout, setIs_logout] = useState(false)

    const logout = () => {
        signOut(auth)
        props.setActiveItem("login")
    }
    return (
        <>
            <div className="absolute top-4 -right-0 px-7">
                <p className="text-sm text-white bg-red-500 text-center font-semibold rounded-lg tracking-wide p-1" onClick={() => setIs_logout(true)}>ログアウト</p>
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
            <ProfileIcon name={name} />
            <Mystamp capsule={props.capsule} />
        </>
    )
}