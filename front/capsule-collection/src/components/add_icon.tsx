import Image from "next/image";
import React from "react";

type Props = {
    setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export default function AddIcon(props: Props){
    return(
        <div className="w-full h-full flex justify-end">
            <Image src="/add_icon.svg" width={65} height={65} alt="" className="rounded-full absolute top-3/4" onClick={() => props.setActiveItem("add_input")} />
        </div>
    )
}