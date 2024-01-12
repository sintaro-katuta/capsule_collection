// ユーザの持っているカプセルを表示するコンポーネント
// コンポーネント関連
import Capsule from './capsule'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'

type Props = {
    capsule: any[]
}

export default function Mystamp(props: Props) {
    const [categories, setCategories] = useState<any>([])
    const [countList, setCountList] = useState<any>([])

    function Count(categoryId: number, userCapsule: any){
        userCapsule.forEach((e: any) => {
            console.log(e.capsule.category.id)
            console.log(categoryId)
            if(e.capsule.category.id == categoryId){
                console.log('ok')
            }
        });
        console.log(categoryId, userCapsule)
    }

    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get('/api/category/select')
            const newcountList: any = []
            res.data.categories.forEach((e: any) => {
                e.capsule.forEach((c: any) => {
                    const test = props.capsule.filter(cp => cp.capsule.id == c.id)
                    newcountList.push(test.length)
                })
            })
            setCategories(res.data.categories)
            setCountList(newcountList)
        }
        getCategory()
    }, [])
    return (
        <div className="h-1/2 flex flex-col items-start justify-start gap-5 overflow-y-auto">
            {categories.map((category: any, i: number) => 
                <div key={i} className='w-full h-1/6 flex items-center justify-between px-5 border border-black rounded-lg'>
                    <p className='font-normal'>{category.name}</p>
                    <p>{countList[i]}/{category.capsule.length}</p>
                </div>
            )}
        </div>
    )
}