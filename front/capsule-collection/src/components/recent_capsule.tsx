// 最近の取得したカプセルを表示するコンポーネント
// Next関連
import Image from "next/image"
import { supabase } from "@/supabase/client"

type Props = {
    capsule: any[]
}

export default function RecentCapsule(props: Props) {
    const getImage = (image: string) => {
        const { data } = supabase.storage.from('capsule').getPublicUrl(image)
        return data.publicUrl
    }
    console.log(props.capsule)
    return (
        <div className="w-full h-1/4">
            <p className="mb-3">最近のスタンプ</p>
            <div className="px-5 bg-headline flex justify-start items-center gap-8 h-3/4 overflow-x-auto rounded-full hide-scroll-bar">
                {props.capsule.map((cp: any, i: number) => (
                    <Image key={i} src={getImage(cp.capsule.image)} width={80} height={80} alt="" objectFit="contain" className='flex-none rounded-full border-2 border-white' />
                ))}
            </div>
        </div>
    )
}