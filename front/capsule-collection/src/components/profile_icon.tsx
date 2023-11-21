import Image from 'next/image'

export default function ProfileIcon() {
    return (
        <div className="flex justify-center items-center h-1/3 mb-5">
            <div className="flex flex-col justify-center items-center gap-3">
                <div className="w-48 h-48 border-2 border-black rounded-full p-2">
                    <label>
                        <input className="hidden" type="file" />
                        <Image src="/chii.svg" width={200} height={200} alt="Icon" />
                    </label>
                </div>
                <div className="flex">
                    <p className="text-lg">ちぃかわ</p>
                    <Image src="/edit.svg" width={20} height={20} alt="Edit" />
                </div>
            </div>
        </div>
    )
}