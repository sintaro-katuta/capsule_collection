import Form from "@/components/form";
import Qrcode from "@/components/qrcode";

import { useState } from "react"
import Image from "next/image";

export default function Admin(props: any) {
    const [activeItem, setActiveItem] = useState<string>("")
    const [category, setCategory] = useState<Object>({})
    const [capsules, setCapsules] = useState<Object>([])

    return (
        <>
            <div className="absolute top-5 -left-0 px-7">
                <Image src="/qr_code.svg" width={30} height={30} alt="" onClick={() => setActiveItem('qr')} />
            </div>
            <div className="absolute top-5 -right-0 px-7">
                <Image src="/info.svg" width={30} height={30} alt="" onClick={() => setActiveItem('form')} />
            </div>
            <form className="w-full h-full px-7">
                {activeItem === 'form' && <Form setActiveItem={setActiveItem} setCategory={setCategory} setCapsules={setCapsules} />}
                {activeItem === 'qr' && <Qrcode />}
            </form>
        </>
    )
}