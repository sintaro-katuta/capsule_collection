// ユーザのアイコンを表示するコンポーネント
// React関連
import { useState } from 'react'
// Next関連
import Image from 'next/image'
// Firebase関連
import { getAuth, updateProfile } from "firebase/auth";
import { set } from 'firebase/database';

type Props = {
    name: string
    icon: string
    setName: (any)
}

export default function ProfileIcon(props: Props) {
    const auth: any = getAuth()
    const [edit, setEdit] = useState<boolean>(false)
    const [edit_icon, setEdit_icon] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [icon, setIcon] = useState<string>('')

    // ユーザの名前を変更する関数
    const changeName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        setEdit(false)
        setName(name)
    }

    // ユーザーのアイコンを変更する関数
    const changeIcon = () => {
        updateProfile(auth.currentUser, {
            photoURL: icon
        })
        setEdit_icon(false)
    }

    const selectIcon = (e: any) => {
        const file = e.target.files[0]; // ファイル本体

        // エラー回避
        if(!file) {
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setIcon(e.target?.result as string)
            setEdit_icon(true)
        };
        reader.readAsDataURL(file); // 画像をData URIとして読み込む
    }
    return (
        <div className="flex justify-center items-center h-2/6">
            <div className="w-full h-full flex flex-col justify-center items-center">
                {edit_icon
                ?
                <div className="w-full h-2/3 flex items-center justify-center">
                    <div className='w-20 h-full' />
                    <label>
                        <input className="hidden" type="file" onChange={(e) => selectIcon(e)} />
                        <Image src={icon} width={100} height={100} alt="Icon" className='p-1 w-28 h-28 rounded-full' />
                    </label>
                    <div className='flex flex-col items-center justify-center gap-3'>
                        <button className='w-20 bg-gray-300 rounded-xl text-white' onClick={() => setEdit_icon(false)}>キャンセル</button>
                        <button className='w-20 bg-button rounded-xl text-white' onClick={() => changeIcon()}>保存</button>
                    </div>
                </div>
                :
                <div className="w-full h-2/3 flex items-center justify-center">
                    <label>
                        <input className="hidden" type="file" onChange={(e) => selectIcon(e)} />
                        <Image src={props.icon} width={100} height={100} alt="Icon" className='p-1 w-28 h-28' />
                    </label>
                </div>
                }
                <div className="w-full h-1/3 flex gap-2 items-center justify-center">
                    {edit
                    ?
                    <>
                        <input type="text" className='w-36 bg-background text-base outline-none' placeholder={props.name} onChange={(e) => setName(e.target.value)} />                        
                        <button className='w-20 bg-button rounded-xl text-white' onClick={() => changeName()}>保存</button>
                        <button className='w-20 bg-gray-300 rounded-xl text-white' onClick={() => setEdit(!edit)}>キャンセル</button>
                    </>
                    :
                    <>
                        <div className='w-16 h-full' />
                        <p className="text-base text-center w-full">{props.name}</p>
                        <button className='bg-button text-white w-16 rounded-xl font-medium' onClick={() => setEdit(!edit)}>編集</button>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}