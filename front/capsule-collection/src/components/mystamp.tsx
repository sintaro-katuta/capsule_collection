// ユーザの持っているカプセルを表示するコンポーネント
// コンポーネント関連
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CapsuleDown from './capsule_down'

type Props = {
    capsule: any[]
}

export default function Mystamp(props: Props) {
    const [categories, setCategories] = useState<any>([])
    const [detail, setDetail] = useState<any>({})

    const countCapsule = (id: string) => {
        let count = 0
        props.capsule.map((myCapsule: any) =>{
            if(myCapsule.capsule.category.id === id){
                count++
            }
        })
        return count
    }

    const showCapsule = (id: string) => {
        const capsule = props.capsule.filter((myCapsule: any) => myCapsule.capsule.category.id === id)
        return capsule
    }
    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category/select')
            if(res.data.categories.length === 0){
                return
            }
            setCategories(res.data.categories)
        }
        getCategory()
    }, [props.capsule])
    return (
        <div className="w-full h-1/2 flex flex-col items-center justify-start gap-5 overflow-y-auto">
            {categories.map((category: any, i: number) => 
            <>
                <CapsuleDown key={i} value={category.name} mol={countCapsule(category.id)} deno={category.capsule.length} content={showCapsule(category.id)} index={i} />
            </>
            )}
        </div>
    )
}