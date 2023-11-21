import Image from "next/image";
import { useEffect } from "react";

export default function Stamp(props: any) {
    return (
        <div className="h-3/5">
            <p className="my-3">スタンプ</p>
            <div className="h-full bg-headline rounded-2xl gap-5 grid grid-cols-3 grid-rows-3 place-items-center overflow-y-auto px-10 py-5 mb-5 hide-scroll-bar">
                <div className="relative w-20 h-20 border-2 border-black rounded-full bg-background flex-none">
                    <Image src="/add.svg" layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                </div>
                {props.capsule.map((cp: any, i: number) => (
                    <div key={i} className="relative w-20 h-20 border-2 border-black rounded-full bg-background flex-none">
                        <Image src={cp.image} layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    )
}