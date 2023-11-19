import Image from "next/image";

export default function Stamp(props: any) {
    return (
        <div className="h-3/5">
            <p className="my-3">スタンプ</p>
            <div className="h-full bg-headline rounded-2xl grid grid-cols-3 place-items-center overflow-y-auto px-10 gap-7 py-5 mb-5 hide-scroll-bar">
                {props.capsule.map((cp: any, i: number) => (
                    <div key={i} className="flex flex-col items-center justify-center">
                        <Image src={cp.image} width={70} height={70} alt="Icon" className="col-span-1 row-span-1 p-2 border-2 border-black rounded-full bg-background w-full h-auto" />
                        <p className="text-xs text-center text-background">{cp.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}