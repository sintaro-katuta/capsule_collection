// カプセルの情報を表示するコンポーネント
// Next関係
import Image from "next/image"

type Props = {
    capsule: any
}

export default function Capsule(props: Props) {
    return (
        <div className="w-full bg-headline rounded-2xl">
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-2">
                    <div className="relative w-10 h-10 border-2 border-black rounded-full bg-background flex-none">
                        <Image src={props.capsule.image} layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                    </div>
                    <p className="text-sm">{props.capsule.name}</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="relative w-40 h-40 border-2 border-black rounded-full bg-background flex-none">
                    <Image src={props.capsule.image} layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <p className="text-sm">{props.capsule.name}</p>
            </div>
        </div>
    )
}