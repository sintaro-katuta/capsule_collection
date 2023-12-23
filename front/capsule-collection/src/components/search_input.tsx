// 検索のフォームのコンポーネント

// Components関連
import CheckBox from "./checkbox"
// Next関連
import Image from "next/image"

import axios from "axios"

// React関連
import React, { useEffect, useState } from 'react'

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setCategories: React.Dispatch<React.SetStateAction<any>>
}

export default function SearchInput(props: Props) {
    const [filter, setFilter] = useState<boolean>(false)
    const [categories, setCategories] = useState<any>([])
    const priceList: number[] = [200, 300, 400, 500, 600, 800, 1000, 1500, 2000, 2500]

    const chageHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setLoading(true)
        const searchRes = await axios.post('/api/category/search', {name : e.target.value})
        console.log(searchRes.data)
        props.setCategories(searchRes.data.categories)
        props.setLoading(false)
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        props.setLoading(true)
        // ここに絞り込みの処理を書く
        props.setLoading(false)
        setFilter(false)
    }

    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category/select')
            console.log(res.data.categories)
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
                    <Image src="/cancel.svg" width={20} height={20} alt="search" className="" onClick={() => setFilter(!filter)} />
                    :
                    <Image src="/filter.svg" width={20} height={20} alt="search" className="" onClick={() => setFilter(!filter)} />
                }   
                </div>
            </form>
            {filter &&
                <>
                    <div className="w-full h-4/5 my-2 border rounded-2xl flex flex-col">
                        <div className="w-full h-1/2 p-2">
                            <p className="w-fit bg-headline rounded-2xl text-white px-2 my-2">カテゴリ</p>
                            <div className="w-full h-4/5 flex flex-wrap gap-3 overflow-y-auto hide-scroll-bar">
                                <CheckBox value={"value"} />
                                <CheckBox value={"value2"} />
                                {/* {categories.map((category: any, i: number) => (
                                    <label key={i} className="w-fit h-10 px-2 bg-white rounded-full flex justify-center items-center gap-2">
                                        <input type="checkbox" />
                                        <p>{category.name}</p>
                                    </label>
                                ))} */}
                            </div>
                        </div>
                        <hr />
                        <div className="w-full h-1/2 p-2">
                            <p className="w-fit bg-headline rounded-3xl text-white px-2 my-2">価格</p>
                            <div className="w-full h-4/5 grid grid-cols-3 place-items-center gap-5 overflow-y-auto hide-scroll-bar">
                                {priceList.map((price: number, i: number) => (
                                    <CheckBox key={i} value={price+"円"} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="w-full h-12 bg-button text-white rounded-2xl" onClick={(e: React.FormEvent) => onSubmit(e)}>絞り込み</button>
                    </div>
                </>
            }
        </>

    )
}