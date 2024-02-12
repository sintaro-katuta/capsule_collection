// 検索画面のコンポーネント
// コンポーネント関連
import Loading from "./loading"
import SearchInput from "./search_input"
import Category from "./category"
import CategoryDetail from "./category_detail"

import { useState } from "react"

export default function Search() {
    // 全カテゴリーのステート
    const [categories, setCategories] = useState<any[]>([])
    // 検索の画面の表示のステート
    const [search, setSearch] = useState<boolean>(false)
    // 詳細画面の表示のステート
    const [detail, setDetail] = useState<boolean>(false)
    // 詳細画面のカテゴリーのステート
    const [selectCategory, setSelectCategory] = useState<any>({})
    // ローディング画面の表示のステート
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <>
            {/* 検索のフォームのコンポーネント */}
            <SearchInput setLoading={setLoading} setCategories={setCategories} setSearch={setSearch} setDetail={setDetail} />
            {/* 検索結果 */}
            {loading
            ?
                <Loading />
            :
                <>
                    {search && 
                        <>
                            {detail
                                ?
                                <>
                                    <CategoryDetail setDetail={setDetail} selectCategory={selectCategory} setLoading={setLoading} />
                                </>
                                :
                                <>
                                    <div className="w-full h-5/6 grid grid-cols-1 grid-rows-2 overflow-y-auto gap-3 my-4 hide-scroll-bar">
                                        {categories.map((category: any, i: number) => (
                                            <Category key={i} category={category} setDetail={setDetail} setSelectCategory={setSelectCategory}  />
                                        ))}
                                    </div>
                                </>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}