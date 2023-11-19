import Image from "next/image"

export default function RecentCapsule(props: any) {
    return (
        <div className="h-1/4">
            <p className="mb-3">最近のカプセル</p>
            <div className="flex gap-5 bg-headline rounded-full p-3">
                <div className="flex flex-row overflow-x-auto rounded-full hide-scroll-bar">
                    {props.capsule.map((cp: any, i: number) => (
                        <Image src={cp.image} width={70} height={70} alt="Icon" key={i} className="p-2 mx-2 border-2 border-black rounded-full bg-background" />
                    ))}
                </div>
            </div>
        </div>
    )
}