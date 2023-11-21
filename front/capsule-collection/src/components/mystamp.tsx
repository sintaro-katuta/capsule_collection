import Image from 'next/image'

export default function Mystamp(props: any) {
    return (
        <div className="h-full">
            <div className="flex flex-row justify-end items-end mb-5">
                <div className="basis-1/3" />
                <p className="basis-1/3 text-center">マイスタンプ</p>
                <p className="basis-1/3 text-right">65/132</p>
            </div>
            <div className="flex justify-center items-center bg-headline h-1/2 rounded-2xl">
                <div className="h-full bg-headline rounded-2xl grid grid-cols-3 grid-rows-3 place-items-center overflow-y-auto px-10 gap-7 py-5 mb-5 hide-scroll-bar">
                    {props.capsule.map((cp: any, i: number) => (
                        <div key={i} className="relative w-20 h-20 m-4 border-2 border-black rounded-full bg-background flex-none">
                            <Image src={cp.image} layout="fill" objectFit="contain" alt="Icon" className="object-contain rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}