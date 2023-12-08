// カプセルの情報を表示するコンポーネント
// Next関係
import Image from "next/image"

type Props = {
    capsule: any[]
}

export default function Cupusule(props: Props) {
    return (
        <div className="h-40 bg-headline rounded-2xl">
            <div className="flex items-center pt-3">
                <div className="relative w-10 h-10 mx-3 border border-black rounded-full bg-background flex-none">
                    {/* カプセルのアイコン */}
                    <Image src={props.capsule[0].image} layout="fill" objectFit="contain" alt="" className="object-contain rounded-full" />
                </div>
                {/* カテゴリの名前 */}
                <p className="text-background">ちぃかわ</p>
            </div>
            <div className="flex justify-center items-center w-full h-3/5 px-4 overflow-x-auto hide-scroll-bar">
                {props.capsule.map((cp: any, i: number) => (
                    // 横並びにすべてのカプセルを表示
                    <div className="relative w-16 h-16 mx-2 border-2 border-black rounded-full bg-background flex-none hide-scroll-bar" key={i}>
                        <Image src={cp.image} layout="fill" objectFit="contain" alt="" className="object-contain rounded-full p-1" />
                    </div>
                ))}
            </div>
        </div>
    )
}