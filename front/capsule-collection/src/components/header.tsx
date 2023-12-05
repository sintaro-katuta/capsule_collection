import Image from "next/image"

export default function Header() {
    return (
        <div className="flex w-full h-16 justify-center items-center">
            <Image
                src="/title.svg"
                alt="Picture of the author"
                width={80}
                height={80}
                className="w-1/3"
            />
        </div>
    )
}