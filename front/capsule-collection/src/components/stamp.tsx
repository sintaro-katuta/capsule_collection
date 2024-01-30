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
    const getImage = (image: string) => {
        const { data } = supabase.storage.from('capsule').getPublicUrl(image)
        return data.publicUrl
    }
    return (
        <div className="w-full h-3/4">
            <div className="w-full h-4/5 justify-center items-center rounded-2xl">
                <p className="w-full h-fit">スタンプ</p>
                <div className="w-full h-full bg-headline rounded-2xl grid grid-cols-3 grid-rows-3 place-items-center overflow-y-auto hide-scroll-bar">
                    {props.capsule.map((cp: any, i: number) => (
                        <Image key={i} src={getImage(cp.capsule.image)} width={80} height={80} objectFit='contain' alt="" className='object-contain rounded-full bg-white p-1' />
                    ))}
                </div>
                <AddIcon setActiveItem={props.setActiveItem} />
            </div>
        </div>
    )
}