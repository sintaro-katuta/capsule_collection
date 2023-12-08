// ユーザのアイコンを表示するコンポーネント
// Next関連
import Image from 'next/image'

type Props = {
    name: string
}

export default function ProfileIcon(props: Props) {
    return (
        <div className="flex justify-center items-center h-1/4">
            <div className="h-full flex flex-col justify-center items-center">
                <div className="w-28 h-28 border-2 border-black rounded-full p-2">
                    <label>
                        <input className="hidden" type="file" />
                        <Image src="/chii.svg" width={150} height={150} alt="Icon" />
                    </label>
                </div>
                <div className="flex">
                    <p className="text-base">{props.name}</p>
                    <Image src="/edit.svg" width={20} height={20} alt="Edit" />
                </div>
            </div>
        </div>
    )
}