import Image from "next/image";
import React from "react";

type Props = {
    category: {
        id: string
        name: string
        image: string
        price: number
        capsule: [{
            id: number
            image: string
        }]
    },
    setDetail: React.Dispatch<React.SetStateAction<boolean>>
    setSelectCategory: React.Dispatch<React.SetStateAction<any>>
}

export default function Category(props: Props){
    const toDetail = () => {
        // 詳細画面で表示するカテゴリーのIDをセット
        props.setSelectCategory(props.category)
        // 詳細画面に遷移
        props.setDetail(true)
    }
    return(
        <>
            <div className="bg-headline w-full h-full rounded-3xl flex flex-col justify-start items-center p-3 gap-2" onClick={() => toDetail()}>
                <div className="w-full">
                    <p className="w-full h-fit text-base text-white bg-button rounded-full text-center">{props.category.name}<span className="text-xs">シリーズ</span></p>
                </div>
                <div className="w-full h-full flex gap-5">
                    <div className="w-full h-full flex items-center justify-center">
                        <Image src={props.category.image} width={100} height={100} alt="" className="rounded-lg" />
                    </div>
                </div>
            </div>
        </>
    )
}