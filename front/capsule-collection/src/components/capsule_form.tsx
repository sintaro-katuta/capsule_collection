// カプセルの追加フォームのコンポーネント
import Image from 'next/image'
import { useEffect, useState, createRef } from 'react'
// 以下画像のりサイズを変更するためのライブラリ
import "cropperjs/dist/cropper.css"
import Cropper from 'react-cropper'
import { ReactCropperElement } from 'react-cropper'

export default function CapsuleForm(props: any) {
    // カプセルの名前を入力するためのステート
    const [name, setName] = useState<string>('')
    // カプセルの画像のステート
    const [image, setImage] = useState<any>({})
    // カプセルの情報を格納するためのステート
    const [capsules, setCapsules] = useState<any>([])
    // エラーメッセージを表示するためのステート
    const [error, setError] = useState<string>('')
    // 画像をリサイズするためのライブラリのリファレンス
    const cropperRef = createRef<ReactCropperElement>()
    // オブジェクトが空かどうかを判定する関数(空ならtrueを返す)
    const isEmpty = (obj: Object) => {
        return Object.keys(obj).length === 0
    }
    // 引数arrayに引数fileNameが含まれているかを判定する関数
    const fileNameCheck = (array: any, fileName:string) => {
        let result = false
        array.map((data: any) => {
            if(data.image.fileName === fileName){
                result = true
            }
        })
        return result
    }
    // 前にカプセルの情報を入力していた時の情報をステートに格納
    useEffect(() => {
        if(props.capsules.length !== 0){
            setCapsules(props.capsules)
        }
    },[props])
    // カプセルの画像のイベント
    const selectImage = (e: any) => {
        setError('')
        const maxSize = 10485760; // 1MB
        const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml']
        const file = e.target.files[0]; // ファイル本体
        // エラー回避
        if(!file) {
            setImage({})
            return
        }
        if(file.size > maxSize){
            setImage({})
            setError('ファイルサイズが大きすぎます')
            return
        }else if(!IMAGE_TYPES.includes(file.type)){            
            setImage({})
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
        setImage(fileData)
    }
    // カプセルの情報をステートに格納する関数
    const addCapsule = async () => {
        setError('')
        if(!name){
            setError('カプセルの名前を入力してください')
            return
        }
        if(!image.url){
            setError('イメージ画像を選択してください')
            return
        }
        if(fileNameCheck(capsules, image.fileName)){
            setError('同じファイル名の画像が存在します')
            return
        }
        if(!cropperRef.current) return
        const croppedImage = cropperRef.current.cropper.getCroppedCanvas().toDataURL()
        const file = await convertDataUrlToFile(croppedImage, image.fileName, "image/png")
        const imageData = {
            file: file,
            fileName: file.name,
            url: croppedImage
        }
        const capsuleData = {
            name: name,
            image: imageData
        }
        setName('')
        setImage({})
        setCapsules([...capsules, capsuleData])
    }
    // blobからファイルを生成する関数
    const convertDataUrlToFile = async (dataUrl: string, fileName: string, type: "image/png" | "image/jpeg") => {
        const blob = await (await fetch(dataUrl)).blob()
        return new File([blob], fileName, { type })
    }
    // カプセルの情報を削除する関数
    const deleteCapsule = (index: number) => {
        const newCapsules = [...capsules]
        console.log(newCapsules)
        newCapsules.splice(index, 1)
        console.log(newCapsules)
        setCapsules(newCapsules)
    }
    // 前の画面へ戻る関数
    const cancel = (e: React.FormEvent) => {
        e.preventDefault()
        props.setCapsules(capsules)
        props.setActiveItem('category')
    }
    // 次の画面へ遷移する関数
    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(capsules)
        if(capsules.length === 0){
            setError('カプセルを追加してください')
            return
        }
        props.setCapsules(capsules)
        props.setActiveItem('confirm')
    }
    return (
        <>
            
            <div className="w-full h-full flex flex-col gap-4 justify-between">                
                <div className="flex items-center justify-center w-full h-fit bg-headline rounded-full">
                    <p className=" text-white font-medium">{props.category.name}シリーズ</p>
                </div>
                <div className='w-full h-2/4 bg-headline rounded-2xl flex items-center justify-center p-3 gap-2'>
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                        <div className='w-full flex'>
                            <input type="text" className='w-full h-8 rounded-full px-5 outline-none' placeholder='名前' id="name" value={name} onChange={(e: any) => setName(e.target.value)} />    
                        </div>
                        <label className='w-full h-10 bg-white rounded-full flex justify-center items-center'>
                            <input type="file" accept="image/*" className='hidden' onChange={(e: React.FormEvent) => selectImage(e)} />
                            <p>ファイルの選択</p>
                        </label>
                        {!isEmpty(image)
                        ?                             
                            <Cropper
                                src={image.url}
                                width={200}
                                height={200}
                                ref={cropperRef}
                                aspectRatio={1}
                                guides={false}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                checkOrientation={false}
                                autoCropArea={0.5} // Adjust the value to resize the cropped area
                            />
                        : <p className='text-white'>選択した画像が表示されます</p>
                        }
                        <div className='w-full h-8 bg-button flex justify-center items-center rounded-full cursor-pointer' onClick={() => addCapsule()}>
                            <p className='text-white'>追加</p>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full bg-headline rounded-xl p-2 px-6 overflow-y-auto flex flex-col items-center justify-start gap-3'>
                    {capsules.map((cp: any, i: number) => (
                        <div key={i} className='w-full h-1/3 flex justify-center items-center gap-5'>
                            <Image src={cp.image.url} width={55} height={55} alt="" className="object-contain rounded-lg" />            
                            <p className='text-white text-base font-medium text-center w-2/4'>{cp.name}</p>
                            <Image src="/delete.svg" width={20} height={20} alt="" className="object-contain" onClick={() => deleteCapsule(i)} />
                        </div>
                    ))}
                </div>
                <div className='h-7'>
                    {error && <p className='text-base font-semibold bg-red-500 rounded-full text-white text-center'>{error}</p>}
                </div>
                <div className='flex gap-5'>
                    <button className='w-1/2 h-12 bg-gray-300 rounded-full text-white' onClick={(e: any) => cancel(e)}>戻る</button>
                    <button className='w-1/2 h-12 bg-button rounded-full text-white' onClick={(e: any) => submit(e)}>確認</button>
                </div>
            </div>
        </>
    )
}