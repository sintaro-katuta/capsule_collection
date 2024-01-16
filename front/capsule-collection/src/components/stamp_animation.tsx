import { useState } from "react";
import Image from "next/image";

export default function StampAnimation(props: any) {
    const [animation, setAnimation] = useState("pulse")
    const [animationFlag, setAnimationFlag] = useState<boolean>(false)

    function sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const tapAnimation = async() => {
        setAnimation("slam-top")
        await sleep(1500)
        setAnimationFlag(true)
        console.log(props.capsuleIndex)
        console.log(props.capsuleLength)
        if(props.capsuleIndex == props.capsuleLength - 1){
            props.setActiveItem("home")
        }
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
                            <p className="font-semibold text-base">{props.categoryName}シリーズ</p>
                        </>
                    }
                    <Image src={props.capsule.image} width={200} height={200} alt="" className={`rounded-full border-2 border-black mt-5 ${animation}`} onClick={() => tapAnimation()} />
                </div>
            }
        </>
    )
}
