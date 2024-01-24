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
        <div className="h-1/4">
            <p className="mb-3">最近のスタンプ</p>
            <div className="bg-headline rounded-full mb-5 h-2/3">
                <div className="flex justify-start items-center h-full overflow-x-auto mx-2 p-2 gap-7 rounded-full hide-scroll-bar">
                    {props.capsule.map((cp: any, i: number) => (
                        <Image key={i} src={getImage(cp.capsule.image)} width={80} height={80} objectFit='contain' alt="" className='object-contain rounded-full bg-white p-1' />
                    ))}
                </div>
            </div>
        </div>
    )
}