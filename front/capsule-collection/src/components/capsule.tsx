// カプセルの情報を表示するコンポーネント
// Next関係
import Image from "next/image"
import React from "react"

type Props = {
    capsule: any
    selectCapsule: boolean
}

export default function Capsule(props: Props) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">              
            <Image src={props.capsule.image} width={90} height={90} objectFit="contain" alt="" className={`rounded-full border-2 ${props.selectCapsule ? 'border-white' : 'border-button'}`} />
            <p className="text-sm text-white font-medium">{props.capsule.name}</p>
        </div>
    )
}