// カプセルを追加するためのアイコンのコンポーネント
import Image from "next/image";
import React from "react";

type Props = {
    setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export default function AddIcon(props: Props){
    return(
        <div className="w-full h-full flex justify-end">
            <div className="w-20 h-20 bg-button rounded-full absolute top-3/4 shadow-md flex justify-center items-center" onClick={() => props.setActiveItem("qr_camera")}>
                <Image src="/plus.svg" width={40} height={40} alt="" />
            </div>
        </div>
    )
}