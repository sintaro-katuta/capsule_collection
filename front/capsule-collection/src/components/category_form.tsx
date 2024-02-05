import React, { useEffect, useState, createRef } from 'react'
import "cropperjs/dist/cropper.css"
import Cropper from 'react-cropper'
import { ReactCropperElement } from 'react-cropper'

export default function CategoryForm(props: any) {
    const cropperRef = createRef<ReactCropperElement>()
    const priceList: number[] = [200, 300, 400, 500, 600, 800, 1000, 1500, 2000, 2500]

    const [name, setName] = useState<string>('')
    const [price, setPrice] = useState<number>(200)
    const [image, setImage] = useState<any>({})
    const [error, setError] = useState<string>('')
    const [modal, setModal] = useState<boolean>(false)
    const [crop, setCrop] = useState<any>()

    // オブジェクトが空かどうかを判定する関数(空ならtrueを返す)
    const isEmpty = (obj: Object) => {
        return Object.keys(obj).length === 0
    }

    useEffect(() => {
        if(!isEmpty(props.category)){
            setName(props.category.name)
            setPrice(props.category.price)
            setImage(props.category.image)
        }
    }, [props])

    function selectImage(e: any) {
        setError('')
        const maxSize = 10485760; // 1MB
        const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml']
        const file = e.target.files[0]; // ファイル本体
        // エラー回避
        if(!file) {
            setError('ファイルが選択されていません')
            setImage({})
            return
        }
        if(file.size > maxSize){
            setError('ファイルサイズが大きすぎます')
            setImage({})
            return
        }else if(!IMAGE_TYPES.includes(file.type)){
            setError('対応していないファイル形式です')
            setImage({})
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

    async function submit(e: React.FormEvent) {
        e.preventDefault()
        if(!name){
            setError('シリーズ・カテゴリーを入力してください')
            return
        }
        if(!image.url){
            setError('イメージ画像を選択してください')
            return
        }
        if(!cropperRef.current) return
        const imageUrl = URL.createObjectURL(image.file)
        const croppedImage = cropperRef.current.cropper.getCroppedCanvas().toDataURL()
        const file = await convertDataUrlToFile(croppedImage, "image.png", "image/png")
        const imageData = {
            file: file,
            fileName: file.name,
            url: imageUrl
        }
        console.log(file)
        props.setCategory({ name, price, image: imageData })
        props.setActiveItem('capsule')
    }

    const convertDataUrlToFile = async (dataUrl: string, fileName: string, type: "image/png" | "image/jpeg") => {
        const blob = await (await fetch(dataUrl)).blob()
        return new File([blob], fileName, { type })
    }
    return ( 
        <>
            <div className="w-full h-full flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <p className="bg-headline text-white w-fit rounded-xl px-1 font-medium">シリーズ・カテゴリー</p>
                    <input type="text" className="h-10 px-5 rounded-full outline-none" value={name} autoFocus placeholder="例:ならぶんです　恐竜さん２" onChange={(e: any) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-3">
                    <p className="bg-headline text-white w-fit rounded-xl px-1 font-medium">価格</p>
                    <select className='bg-white h-10 rounded-full px-2 text-center' value={price} onChange={(e: any) => setPrice((Number(e.target.value)))}>
                        {priceList.map((p: number , i: number) => {
                            return <option key={i} value={p}>{p}円</option>
                        })}
                    </select>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="bg-headline text-white w-fit rounded-xl px-1 font-medium">イメージ画像</p>
                    <label className='w-full h-10 bg-white rounded-full flex justify-center items-center'>
                        <input type="file" accept="image/*" className='hidden' onChange={(e: React.FormEvent) => selectImage(e)} />
                        <p>ファイルの選択</p>
                    </label>
                    <div className='flex items-center justify-center'>
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
                        :
                            <p className='text-base'>選択した画像が表示されます</p>
                        }
                    </div>
                </div>
                {error && <p className='text-sm font-semibold bg-red-500 rounded-full text-white text-center'>{error}</p>}
                <button className="bg-button text-white rounded-xl w-full h-10 font-bold" onClick={(e: React.FormEvent) => submit(e)}>次へ</button>
            </div>
        </>
    )
}