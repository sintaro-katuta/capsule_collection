// 検索のフォームのコンポーネント
// Next関連
import Image from "next/image"

export default function SearchInput() {
    return (
        <div className="w-full h-14 m flex items-center justify-center">
            <form className="basis-5/6">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Image src="/search.svg" width={20} height={20} alt="search" className="text-gray-400" />
                    </div>
                    <input type="text" id="default-search" className="block w-full p-3 ps-10 text-base text-black border-2 border-black rounded-2xl bg-background outline-none" placeholder="検索" required />
                </div>
            </form>
            <Image src="/filter.svg" width={20} height={20} alt="search" className="basis-1/6 p-3" />
        </div>
    )
}