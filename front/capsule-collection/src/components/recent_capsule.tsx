import Image from "next/image"

export default function RecentCapsule(props: any) {
    return (
        <div className="h-1/4">
            <p className="mb-3">最近のカプセル</p>
            <div className="bg-headline rounded-full mb-5">
                <div className="flex justify-start items-start overflow-x-auto p-2 rounded-full hide-scroll-bar">
                    {props.capsule.map((cp: any, i: number) => (
                        <div key={i} className="relative w-20 h-20 mx-3 border-2 border-black rounded-full bg-background flex-none">
                            <Image src={cp.image} layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}