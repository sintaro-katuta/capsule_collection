// カプセルの情報を表示するコンポーネント
// Next関係
import Image from "next/image"

type Props = {
    capsule: any
}

export default function Capsule(props: Props) {
    return (
        <div className="w-full h-full p-3">
            <div className="flex justify-center items-center">                
                <Image src={props.capsule.image} width={100} height={100} alt="" className="object-contain rounded" />
            </div>
            <div className="flex justify-center items-center">
                <p className="text-sm text-white">{props.capsule.name}</p>
            </div>
        </div>
    )
}