// ユーザの持っているカプセルを表示するコンポーネント
// Next関連
import Image from 'next/image'

type Props = {
    capsule: any[]
}

export default function Mystamp(props: Props) {
    return (
        <div className="w-full h-3/4 flex flex-col justify-center">
            <div className="flex flex-row justify-end items-end mb-3">
                <div className="basis-1/3" />
                <p className="basis-1/3 text-center text-sm">マイスタンプ</p>
                {/* カプセル全体から取得してるカプセル */}
                <p className="basis-1/3 text-center text-sm">65/132</p>
            </div>
            <div className="flex w-full h-4/5 justify-center items-center rounded-2xl bg-headline">
                <div className="w-full rounded-2xl grid grid-cols-3 grid-rows-3 place-items-center overflow-y-auto hide-scroll-bar">
                    {props.capsule.map((cp: any, i: number) => (
                        <div key={i} className="relative w-20 h-20 m-2 border-2 border-black rounded-full bg-background flex-none">
                            <Image src={cp.image} layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}