// ロゴを表示するコンポーネント
// Next関連
import Image from "next/image"

export default function Header() {
    return (
        <div className="flex w-full h-16 justify-center items-center">
            <Image
                src="/title.svg"
                alt=""
                width={80}
                height={80}
                className="w-1/3"
            />
        </div>
    )
}