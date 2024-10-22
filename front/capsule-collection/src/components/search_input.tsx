// 検索のフォームのコンポーネント
// Components関連
import Filter from "./filter"
// Next関連
import Image from "next/image"
import axios from "axios"
// React関連
import React, { useEffect, useState } from 'react'

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setCategories: React.Dispatch<React.SetStateAction<any>>
    setSearch: React.Dispatch<React.SetStateAction<boolean>>
    setDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SearchInput(props: Props) {
    // フィルター表示のステート
    const [filter, setFilter] = useState<boolean>(false)
    // 全カテゴリーのステート
    const [categories, setCategories] = useState<any>([])
    // カテゴリーの価格のリスト
    const priceList: number[] = [200, 300, 400, 500, 600, 800, 1000, 1500, 2000, 2500]
    // inputの変更時の処理
    const chageHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setCategories([])
        // ローディング開始
        props.setLoading(true)
        // 検索結果の表示
        props.setSearch(false)
        // フィルターを閉じる
        setFilter(false)
        // 検索ワードに空白を&に変換
        const searchWord: string = e.target.value
        // カテゴリーの名前で検索
        const searchRes = await axios.post('/api/category/search', { name : searchWord })
        // 検索結果をカテゴリーにセット
        props.setCategories(searchRes.data.categories)
        // 検索結果の表示
        props.setSearch(true)
        // ローディング終了
        props.setLoading(false)
    }
    // フィルターのアイコン押したときの処理
    const onFilter = (search: boolean) => {
        props.setSearch(search)
        props.setDetail(false)
        setFilter(!filter)
    }
    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category/select')
            setCategories(res.data.categories)
        }
        getCategory()
    }, [])
    return (
        <>
            <form className="w-full h-14 flex items-center justify-center">
                <div className="flex border-2 border-black w-full rounded-2xl items-center justify-between gap-1 px-2">
                    <Image src="/search.svg" width={20} height={20} alt="search" className="text-gray-400" />
                    <input type="text" id="default-search" className="w-4/5 block text-base py-3 text-black bg-background outline-none" placeholder="検索" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => chageHandle(e)} />
                    {filter
                    ?
                    <Image src="/cancel.svg" width={20} height={20} alt="search" className="" onClick={() => onFilter(true)} />
                    :
                    <Image src="/filter.svg" width={20} height={20} alt="search" className="" onClick={() => onFilter(false)} />
                }   
                </div>
            </form>
            {filter &&
                <>
                    <div className="w-full h-4/5 pt-10 rounded-2xl flex flex-col gap-5 overflow-y-auto hide-scroll-bar">
                        <Filter value={"カテゴリー"} filterList={categories.map((category: any) => {return category.name})} setFilter={setFilter} setCategories={props.setCategories} setSearch={props.setSearch} />
                        <Filter value={"価格"} filterList={priceList} setFilter={setFilter} setCategories={props.setCategories} setSearch={props.setSearch} />
                    </div>
                </>
            }
        </>
    )
}