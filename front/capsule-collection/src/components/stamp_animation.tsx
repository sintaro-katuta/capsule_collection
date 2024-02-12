import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/supabase/client";

export default function StampAnimation(props: any) {
    // アニメショーンの状態のステート
    const [animation, setAnimation] = useState("pulse")
    // アニメショーンが終わったかどうかのステート
    const [animationFlag, setAnimationFlag] = useState<boolean>(false)
    // 待機時間を設定する関数
    const sleep = (ms: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    // supabaseのstorageから画像を取得する関数
    const getImage = (image: string) => {
        const { data } = supabase.storage.from('capsule').getPublicUrl(image)
        return data.publicUrl
    }
    // タップアニメーションを設定する関数
    const tapAnimation = async() => {
        setAnimation("slam-top")
        await sleep(1500)
        setAnimationFlag(true)
        props.setActiveItem("home")
    }
    return (
        <>
            {animationFlag
            ? null
            :
                <div className="h-full flex flex-col justify-center items-center">
                    {animation == "pulse"
                        ? <p className="absolute top-1/4 text-lg font-semibold pulse">タップ</p>
                        :
                        <>
                            <p className="bg-button text-headline text-3xl z-10 font-semibold text-center w-full h-fit py-3 rounded-2xl">{props.capsule.name}獲得！</p>
                            <p className="font-semibold text-base">{props.capsule.category.name}シリーズ</p>
                        </>
                    }
                    <Image src={getImage(props.capsule.image)} width={200} height={200} alt="" className={`rounded-full border-2 border-black mt-5 ${animation}`} onClick={() => tapAnimation()} />
                </div>
            }
        </>
    )
}
