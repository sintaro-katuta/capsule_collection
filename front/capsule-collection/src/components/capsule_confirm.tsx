import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'

import { supabase } from '@/supabase/client'

export default function CapsuleConfirm(props: any) {

    const [uploading, setUploading] = useState<boolean>(false)
    const [uploaded, setUploaded] = useState<boolean>(false)

    function test(e: any) {
        e.preventDefault()
        function sleep(time: number){
            return new Promise(resolve => setTimeout(resolve, time))
        }
        props.capsules.map(async (capsule: any) => {
            console.log(capsule)
            await sleep(1000)
        })
    }

    function cancel(e: any) {
        e.preventDefault()
        props.setForm('capsule')
    }

    async function submit(e: any) {
        e.preventDefault()
        setUploading(true)
        //ファイル名に使用するための現在時刻を取得
        let now = Date.now()
        // categoryStorageに画像をアップロード
        const { data, error } = await supabase.storage
            .from('category')
            .upload(`${now}_${props.category.image.fileName}`, props.category.image.file)
        // エラーチェック
        if(error){
            alert(`ストレージエラーが発生しました。${error}`)
            return
        }
        // データベースに登録するためのデータを作成
        const categoryData = {
            name: props.category.name, //カテゴリーの名前
            image: data.path, //カテゴリーの画像のパス(ストレージ)
            price: props.category.price, //カテゴリーの価格
        }
        // APIを通じてデータベースに登録
        const categoryRes = await axios.post('/api/category/create', categoryData)
        // エラーチェック
        if(categoryRes.data.error){
            alert(`データベースエラーが発生しました。${categoryRes.data.error}`)
            return
        }
        // カプセルの数でmapを回す
        await props.capsules.map(async (capsule: any) => {
            // capsuleStorageに画像をアップロード
            const { data, error } = await supabase.storage
            .from('capsule')
            .upload(`${now}_${capsule.image.fileName}`, capsule.image.file)
            // エラーチェック
            if(error){
                alert(`ストレージエラーが発生しました。${error}`)
                return
            }
            // カプセルのリレーションのカテゴリのIDを取得
            const categoryId = await categoryRes.data.category.id
            // データベースに登録するためのデータを作成
            const capsuleData = {
                name: capsule.name,
                image: data.path,
                categoryId: categoryId
            }
            // APIを通じてデータベースに登録
            const capsuleRes = await axios.post('/api/capsule/create', capsuleData)
            // エラーチェック
            if(capsuleRes.data.error){
                alert(`データベースエラーが発生しました。${capsuleRes.data.error}`)
                return
            }
        })
        // アップロード完了
        setUploaded(true)
    }

    return(
        <>
            {uploading
                ?
                <div className="w-full h-4/5 flex justify-center items-center">
                    {uploaded ? <p className="text-2xl">アップロード完了</p> :<p className="text-2xl">アップロード中...</p>}
                </div>
                :
                <div className="w-full h-4/5 flex flex-col gap-3">
                    <button onClick={(e: any) => test(e)}>Button</button>
                    <div className="w-full h-1/2 flex flex-col gap-3 justify-between">
                        <div className='flex flex-col gap-2'>
                            <p className="bg-headline text-white w-fit rounded-xl px-1 font-medium">シリーズ・カテゴリー</p>
                            <p className="text-base">{props.category.name}</p>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className="bg-headline text-white w-fit rounded-xl px-1 font-medium">イメージ画像</p>
                            <Image src={props.category.image.url} width={150} height={150} alt="Icon" className='object-contain rounded-lg' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='bg-headline text-white w-fit rounded-xl px-1 font-medium'>価格</p>
                            <p className='text-base'>{props.category.price}円</p>
                        </div>
                    </div>
                    <p className='bg-headline text-white w-fit rounded-xl px-1 font-medium'>カプセル</p>
                    <div className='w-full h-1/6 bg-headline rounded-full overflow-x-auto'>
                        <div className='flex justify-start items-center w-full h-full px-7 gap-5'>
                            {props.capsules.map((c: any, i: number) =>     
                                <div key={i} className='flex flex-col items-center gap-1'>
                                    <Image src={c.image.url} width={50} height={50} alt="Icon" className='object-contain rounded-lg' />
                                    <p className='text-base text-white'>{c.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <button className='w-1/2 h-12 bg-gray-300 rounded-full text-white' onClick={(e: any) => cancel(e)}>戻る</button>
                        <button className='w-1/2 h-12 bg-button rounded-full text-white' onClick={(e: any) => submit(e)}>保存</button>
                    </div>
                </div>
            }
        </>
    )
}