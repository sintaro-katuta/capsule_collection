import axios from 'axios'
import Image from 'next/image'
import { useState, useEffect } from 'react'

type Props = {
    setDetail: React.Dispatch<React.SetStateAction<boolean>>
    selectCategory: any
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CategoryDetail(props: Props){
    const cansel = () => {
        props.setDetail(false)
    }

    useEffect(() => {
        props.setLoading(true)
        console.log(props.selectCategory)
        props.setLoading(false)
    },[props])
    return(
        <>
            <div className="w-full h-5/6 my-4">
                <div className="w-full flex justify-end">
                    <Image src="/cancel.svg" width={20} height={20} alt="search" onClick={() => cansel()} />
                </div>
                <div className='w-full h-full'>
                    <div className='flex justify-between py-2'>
                        <p className='text-lg font-medium'>{props.selectCategory.name}シリーズ</p>
                        <p className='text-lg font-medium'>{props.selectCategory.price}円/1回</p>
                    </div>
                    <div className='w-full h-full'>
                        <p className='text-lg font-medium'>カプセル</p>
                        <div className='w-full h-4/5 bg-headline rounded-lg grid grid-cols-3 grid-rows-3 overflow-x-auto'>
                            {props.selectCategory.capsule.map((capsule: any) => (
                                <div className='w-full flex justify-center items-center my-4' key={capsule.id}>
                                    <Image src={capsule.image} width={60} height={500} objectFit='contain' alt="" className='object-contain rounded-full bg-white p-1' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}