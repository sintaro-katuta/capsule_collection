// 検索画面のコンポーネント
// コンポーネント関連
import Loading from "./loading"
import SearchInput from "./search_input"
import Capsule from "./capsule"

import { useEffect, useState } from "react"

export default function Search(props: any) {
    const [categories, setCategories] = useState<any[]>([])
    const [capsules, setCapsules] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <>
            {/* 検索のフォームのコンポーネント */}
            <SearchInput setLoading={setLoading} setCategories={setCategories} />
            {/* 検索結果 */}
            {loading
            ?
                <Loading />
            :
                <div className="h-5/6 flex flex-col items-stretch overflow-y-auto gap-5 my-4 hide-scroll-bar">
                    {capsules.map((capsule: any, i: number) => (
                        <Capsule key={i} capsule={capsule} />
                    ))}
                </div>
            }
        </>
    )
}