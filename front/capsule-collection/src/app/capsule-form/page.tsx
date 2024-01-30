'use client'

import Header from "@/components/header"
import CategoryForm from "@/components/category_form"
import CapsuleForm from "@/components/capsule_form"
import Confirm from "@/components/capsule_confirm"
import Qrcode from "@/components/qrcode";

import axios from "axios"

import { supabase } from "@/supabase/client"

import { useEffect, useState } from "react"

export default function Form() {
    const [form, setForm] = useState<string>('qr')
    const [category, setCategory] = useState<Object>({})
    const [capsules, setCapsules] = useState<Object>([])
    const [id, setId] = useState<string | null>(null)
    const [admin, setAdmin] = useState<boolean>(false)

    useEffect(() => {
        const getUser = async () => {
            const auth: any = supabase.auth
            const { data: { user } } = await auth.getUser()
            console.log(user)
            const res = await axios.post('/api/user/select', { id: user.id })
            const userData = res.data.user
            if(userData.role !== 'ADMIN'){
                alert('管理者以外はアクセスできません')
                location.href = '/'
            }else{
                setAdmin(true)
            }
        }
        getUser()
    },[])
    return (
        <>
            {admin &&
                <div className="w-screen h-screen fixed">
                    <Header />
                    <form className="w-full h-full px-7">
                        {form === 'category' && <CategoryForm setForm={setForm} setCategory={setCategory} category={category} /> }
                        {form === 'capsule' && <CapsuleForm setForm={setForm} setCapsules={setCapsules} category={category} capsules={capsules} /> }
                        {form === 'confirm' && <Confirm setForm={setForm} category={category} capsules={capsules} />}
                        {form === 'qr' && <Qrcode />}
                    </form>
                </div>
            }
        </>
    )
}