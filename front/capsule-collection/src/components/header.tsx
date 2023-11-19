import Image from "next/image"

export default function Header() {
    return (
        <div className="flex w-full justify-center items-center">
            <Image
                src="/title.svg"
                alt="Picture of the author"
                width={80}
                height={80}
                className="py-7"
            />
        </div>
    )
}