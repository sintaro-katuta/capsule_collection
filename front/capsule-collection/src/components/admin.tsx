// 権限があるユーザーのみアクセスできるページのコンポーネント
import Form from "@/components/form";
import Qrcode from "@/components/qrcode";

import { useState } from "react"
import Image from "next/image";

export default function Admin() {
    // フォームとQRコードを切り替えるためのステート
    const [activeItem, setActiveItem] = useState<string>("form")
    return (
        <>
            <div className="absolute top-5 -left-0 px-7">
                <Image src="/qr_code.svg" width={30} height={30} alt="" onClick={() => setActiveItem('qr')} />
            </div>
            <div className="absolute top-5 -right-0 px-7">
                <Image src="/info.svg" width={30} height={30} alt="" onClick={() => setActiveItem('form')} />
            </div>
            <form className="w-full h-full px-7">
                {activeItem === 'form' && <Form setActiveItem={setActiveItem} />}
                {activeItem === 'qr' && <Qrcode />}
            </form>
        </>
    )
}