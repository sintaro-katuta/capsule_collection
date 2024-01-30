import RecentCapsule from "./recent_capsule"
import Stamp from "./stamp"
import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "./loading"
import { supabase } from "@/supabase/client"

type Props = {
    setActiveItem: (any)
}

export default function Home(props: Props) {
    const [loading, setLoading] = useState<boolean>(true)
    const [recentCapsule, setRecentCapsule]: any = useState<any>([])
    const [capsule, setCapsule]: any = useState<any>([])
    const [uid, setUid] = useState<string>("")

    useEffect(() => {
        const getUser = async () => {
            const auth: any = supabase.auth
            const { data: { user } } = await auth.getUser()
            setUid(user.id)
        }
        const getCapsule = async () => {
            const recentCapsuleRes = await axios.post('/api/userCapsule/select/recent', { userId: uid })
            const capsuleRes = await axios.post('/api/userCapsule/select', { userId: uid })
            setRecentCapsule(recentCapsuleRes.data.capsule)
            setCapsule(capsuleRes.data.capsule)
        }
        setLoading(true)
        getUser()
        getCapsule()
        setLoading(false)
    },[uid])

    return (
        <>
            {loading
            ?
                <Loading />
            :
                <>
                    <RecentCapsule capsule={recentCapsule} />
                    <Stamp capsule={capsule} setActiveItem={props.setActiveItem} />
                </>
            }
        </>
    )
}