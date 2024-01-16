// ユーザのアイコンを表示するコンポーネント
// React関連
import React, { useState } from 'react'
// Next関連
import Image from 'next/image'

// Supabase関連
import { supabase } from "@/supabase/client"

type Props = {
    uid: string
    name: string
    icon: string
}

export default function ProfileIcon(props: Props) {
    const auth: any = supabase.auth
    const [edit_name, setEdit_name] = useState<boolean>(false)
    const [edit_icon, setEdit_icon] = useState<boolean>(false)
    const [file, setFile] = useState<any>({})
    const [error, setError] = useState<string>('')
    const [name, setName] = useState<string>('')

    // ユーザの名前を変更する関数
    const changeName = async (e: React.FormEvent) => {
        e.preventDefault()
        auth.updateUser({
            data: {
                name: name
            }
        })
        const res = await fetch('/api/user/update/name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: props.uid,
                username: name
            }),
        })
        console.log(res)

        setEdit_name(false)
        setName(name)
    }

    // ユーザーのアイコンを変更する関数
    const changeIcon = async (e: React.FormEvent) => {
        e.preventDefault()
        const { data, error } = await supabase.storage
        .from('user_icon')
        .upload(`${props.uid}/${file.name}`, file.file, {
            upsert: true,
        })
        if(error){
            console.log(error)
            return
        }
        auth.updateUser({
            data: {
                photoURL: data.path
            }
        })
    }

    const selectIcon = (e: any) => {
        setError('')
        const maxSize = 10485760; // 1MB
        const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg']
        const file = e.target.files[0]; // ファイル本体
        // エラー回避
        if(!file) {
            setError('ファイルが選択されていません')
            return
        }
        if(file.size > maxSize){
            setError('ファイルサイズが大きすぎます')
            return
        }else if(!IMAGE_TYPES.includes(file.type)){
            setError('対応していないファイル形式です')
            return
        }
        // URL生成
        const imageUrl = URL.createObjectURL(file)
        const fileData = {
            file: file,
            fileName: file.name,
            url: imageUrl
        }
        setFile(fileData)
        setEdit_icon(true)
    }
    return (
        <div className="flex justify-center items-center h-1/2">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <p className='text-red-500 text-sm'>{ error }</p>
                {edit_icon
                ?
                // 画像選択後の表示
                <div className="w-full h-1/2 flex items-center justify-center">
                    <div className='w-20 h-full' />
                    <label>
                        <input className="hidden" type="file" accept='image/*' />
                        <Image src={file.url} width={100} height={100} alt="Icon" className='p-1 w-28 h-28 rounded-full' />
                    </label>
                    <div className='flex flex-col items-center justify-center gap-3'>
                    <button className='w-20 bg-button rounded-xl text-white' onClick={(e: React.FormEvent) => changeIcon(e)}>保存</button>
                        <button className='w-20 bg-gray-300 rounded-xl text-white' onClick={() => setEdit_icon(false)}>キャンセル</button>
                    </div>
                </div>
                :
                // 画像選択前の表示
                <div className="w-full h-1/2 flex items-center justify-center">
                    <label>
                        <input className="hidden" type="file" accept='image/*' onChange={(e: React.FormEvent) => selectIcon(e)} />
                        <Image src={props.icon} width={100} height={100} alt="Icon" className='p-1 w-28 h-28 rounded-full' />
                    </label>
                </div>
                }
                <div className="w-full h-1/3 flex gap-2 items-center justify-center">
                    {edit_name
                    ?
                    <>
                        <input type="text" className='w-36 bg-background text-base border-b border-black outline-none' placeholder={props.name} onChange={(e: any) => setName(e.target.value)} />                                                
                        <button className='w-fit px-2 bg-gray-300 rounded-xl text-white' onClick={() => setEdit_name(!edit_name)}>キャンセル</button>
                        <button className='w-fit px-2 bg-button rounded-xl text-white' onClick={(e: React.FormEvent) => changeName(e)}>保存</button>
                    </>
                    :
                    <>
                        <div className='w-16 h-full' />
                        <p className="text-base text-center w-full">{props.name}</p>
                        <button className='bg-button text-white w-16 rounded-xl font-medium' onClick={() => setEdit_name(!edit_name)}>編集</button>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}