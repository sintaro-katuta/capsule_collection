// カプセルを登録するコンポーネント
// コンポーネント関連
import Cupusule from "./capsule"
// React関連
import { useState, useEffect } from "react"
// Firebase関連
import { db } from "../firebase/client"
import { getDocs, collection } from "firebase/firestore"

type Props = {
    capsule: any[]
}

export default function Add_Input(props: Props) {
    // dbから取得したcategoriesを登録する
    const [categories, setCategories] = useState([])
    // dbからcategoriesを取得する関数
    const getCategorie = async () => {
        const categories = await getDocs(collection(db, "categories"))
        const newCategories: any = []
        categories.forEach((category: any) => {
            newCategories.push(category.data().category)
        })
        setCategories(newCategories)
    }
    useEffect(() => {
        getCategorie()
    }, [])
    return (
        <div className="h-4/5">
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-800" htmlFor="countries">ガチャカテゴリ</label>
                {/* 取得したカテゴリを出力 */}
                <select id="countries" className="h-10 bg-background border-2 border-black text-gray-900 text-sm rounded-xl outline-none focus:ring-black focus:border-black block w-full p-2.5">
                    {categories.map((category: any, i: number) => (
                        <option key={i} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            {/* 検索結果が出るところ */}
            <div className="w-full h-full my-4 overflow-y-auto flex flex-col gap-5">
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
                <Cupusule capsule={props.capsule} />
            </div>
        </div>
    )
}