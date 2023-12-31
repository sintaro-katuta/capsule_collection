// 検索画面のコンポーネント
// コンポーネント関連
import Loading from "./loading"
import SearchInput from "./search_input"
import Category from "./category"
import CategoryDetail from "./category_detail"

import { useEffect, useState } from "react"

export default function Search(props: any) {
    const [categories, setCategories] = useState<any[]>([])
    const [capsules, setCapsules] = useState<any[]>([])
    const [search, setSearch] = useState<boolean>(false)
    const [detail, setDetail] = useState<boolean>(false)
    const [selectCategory, setSelectCategory] = useState<any>({})
    const [categoryId, setCategoryId] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <>
            {/* 検索のフォームのコンポーネント */}
            <SearchInput setLoading={setLoading} setCategories={setCategories} setSearch={setSearch} />
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
                                        <div className="w-full h-5/6 grid grid-cols-2 grid-rows-2 overflow-y-auto gap-3 my-4 hide-scroll-bar">
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