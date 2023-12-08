// 取得したスタンプを表示するコンポーネント
// Next関連
import Image from "next/image";

type Props = {
    capsule: any[]
    setPage: any
}

export default function Stamp(props: Props) {
    return (
        <div className="h-3/5">
            <p className="my-3">スタンプ</p>
            <div className="flex w-full h-full justify-center items-center rounded-2xl">
                <div className="w-full h-full bg-headline rounded-2xl grid grid-cols-3 grid-rows-3 place-items-center overflow-y-auto hide-scroll-bar">
                    <div className="relative w-20 h-20 border-2 border-black rounded-full bg-background flex-none">
                        <Image src="/add.svg" layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" onClick={() => props.setPage(true)} />
                    </div>
                    {props.capsule.map((cp: any, i: number) => (
                        <div key={i} className="relative w-20 h-20 border-2 border-black rounded-full bg-background flex-none">
                            <Image src={cp.image} layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}