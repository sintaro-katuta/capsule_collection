'use client'
import Qrcode from "@/components/qrcode";
import { useEffect } from "react";
import axios from "axios";
import { supabase } from "@/supabase/client";

export default function QR(props: any) {
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
            }
        }
        getUser()
    },[])
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Qrcode value={props.params.id} />
        </div>
    )
}