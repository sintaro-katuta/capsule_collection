import Image from "next/image"

export default function SearchInput() {
    return (
        <div className="w-full h-14 flex items-center">
            <form className="basis-5/6">
                {/* <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-400 sr-only dark:text-white">Search</label> */}
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Image src="/search.svg" width={20} height={20} alt="search" className="text-gray-400" />
                    </div>
                    <input type="text" id="default-search" className="block w-full p-3 ps-10 text-sm text-black border border-gray-300 rounded-2xl bg-gray-300 outline-none" placeholder="検索" required />
                </div>
            </form>
            <Image src="/filter.svg" width={20} height={20} alt="search" className="basis-1/6 p-3" />
        </div >
    )
}