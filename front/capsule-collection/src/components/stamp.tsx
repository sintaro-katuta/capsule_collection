// 取得したスタンプを表示するコンポーネント
// Next関連
import Image from "next/image";
import { supabase } from "@/supabase/client";

// Components
import AddIcon from "@/components/add_icon"

type Props = {
    capsule: any[]
    setActiveItem: (any)
}

export default function Stamp(props: Props) {
    // supagaseのstorageから画像を取得する関数
    const getImage = (image: string) => {
        const { data } = supabase.storage.from('capsule').getPublicUrl(image)
        return data.publicUrl
    }
    return (
        <div className="w-full h-3/4 mt-5">
            <div className="w-full h-5/6 justify-center items-center rounded-2xl">
                <p className="w-full h-fit">スタンプ</p>
                <div className="w-full h-full bg-headline rounded-2xl grid grid-cols-3 grid-rows-3 place-items-center overflow-y-auto hide-scroll-bar">
                    {props.capsule.map((cp: any, i: number) => (
                        <Image key={i} src={getImage(cp.capsule.image)} width={80} height={80} alt="" className='rounded-full bg-white' />
                    ))}
                </div>
                <AddIcon setActiveItem={props.setActiveItem} />
            </div>
        </div>
    )
}