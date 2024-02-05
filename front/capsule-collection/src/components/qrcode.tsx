import { QRCodeCanvas } from "qrcode.react"
import axios from "axios"
import React, { FormEvent, useEffect, useState } from "react"

export default function Qrcode(props: any) {
    const [categories, setCategories] = useState<any>([])
    const [capsules, setCapsules] = useState<any>([])

    const addCategory = async (e: any) => {
        e.preventDefault()
        console.log(e.target.value)
        const res = await axios.post('/api/category/select/', { id: e.target.value })
        setCapsules(res.data.category.capsule)
    }
    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category/select')
            setCategories(res.data.categories)
        }
        getCategory()
    }, [])
    return (
        <div className="w-full h-full flex flex-col gap-20 justify-start items-center">
            <select defaultValue="default" className="w-1/2 h-10 z-40 border border-black" onChange={(e: FormEvent) => addCategory(e) }>
                <option value="default">カテゴリーを選択してください</option>
                {categories.map((category: any, i: number) => (
                    <option key={i} value={category.id}>{category.name}</option>
                ))}
            </select>
            <div className="flex flex-col gap-5 overflow-y-auto hide-scroll-bar">
                {capsules.map((capsule: any, i: number) => (
                    <>
                        <QRCodeCanvas value={capsule.id} size={200} />
                        <p className="text-center">{capsule.name}</p>
                    </>
                    
                ))}
            </div>
        </div>
    )
}