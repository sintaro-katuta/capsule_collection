import Image from "next/image";
import React from "react";

type Props = {
    setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export default function AddIcon(props: Props){
    return(
        <div className="w-full h-full flex justify-center">
            <Image src="/add.svg" width={60} height={60} alt="" className="rounded-full absolute top-3/4" onClick={() => props.setActiveItem("search")} />
        </div>
    )
}