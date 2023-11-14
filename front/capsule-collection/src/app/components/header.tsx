import Image from "next/image"

export default function Header() {
    return (
        <div className="flex justify-center items-center">
            <Image
                src="/title.svg"
                alt="Picture of the author"
                width={120}
                height={120}
                className="py-6"
            />
        </div>
    )
}