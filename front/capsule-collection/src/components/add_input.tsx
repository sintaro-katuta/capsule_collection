// カプセルを登録するコンポーネント
// コンポーネント関連
import Cupusule from "./capsule"
import Loading from "./loading"
// React関連
import React, { useState, useEffect } from "react"

import Image from "next/image"
import axios from "axios"

type Props = {
    setActiveItem: (any)
}

export default function Add_Input(props: Props) {
    // dbから取得したcategoriesを登録する
    const [categories, setCategories] = useState([])
    const [capsule, setCapsule] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const cancel = (e: React.FormEvent) => {
        e.preventDefault()
        props.setActiveItem("home")
    }

    const selectCategory = async (e: any) => {
        const res = await axios.post('/api/capsule/select', { id: e.target.value })
        console.log(res.data)
        setCapsule(res.data.capsule)
    
    }
    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category/select')
            console.log(res.data.categories)
            setCategories(res.data.categories)
            setLoading(false)
        }
        getCategory()
    },[])

    return (
        <>
            {loading
            ?
                <Loading />
            :
                <div className="h-4/5">
                    <div className="w-full h-8 flex justify-between items-center">
                        <Image src="/cancel.svg" width={35} height={35} alt="" onClick={(e: React.FormEvent) => cancel(e)}/>
                        <p className="w-fit bg-button p-2 py-1 rounded-full text-white font-semibold">追加</p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-800" htmlFor="countries">ガチャカテゴリ</label>
                        {/* 取得したカテゴリを出力 */}
                        <select id="countries" defaultValue={'default'} className="h-12 px-3 bg-background border-2 border-black text-gray-900 text-sm rounded-xl outline-none focus:ring-black focus:border-black block w-full" onChange={(e: any) => selectCategory(e)}>
                            <option value="default" disabled>カテゴリを選択してください</option>
                            {categories.map((category: any, i: number) => (
                                <option key={i} className="h-full" value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* 検索結果が出るところ */}
                    <div className="w-full h-full my-4 p-3 bg-headline rounded-xl grid grid-cols-3 grid-rows-3 place-items-center overflow-y-auto hide-scroll-bar">
                        {capsule.map((cp: any, i: number) => (
                            <>
                                <Cupusule key={i} capsule={cp} />
                            </>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}