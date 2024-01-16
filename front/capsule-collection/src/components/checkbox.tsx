import React from "react"
import { useState } from "react"
import Image from "next/image"

type Props = {
    value: string | number
}

export default function CheckBox(props: Props){

    const [checked, setChecked] = useState(false)

    const changeHandle = (e: any) => {
        setChecked(e.target.checked)
    }

    return(
        <>
            {checked
                ?
                <label className="w-fit h-10 px-4 bg-headline text-white rounded-full flex justify-center items-center gap-2">
                    <input type="checkbox" hidden onChange={(e: React.ChangeEvent) => changeHandle(e)} />
                    <p>{props.value}</p>
                </label>
                :
                <label className="w-fit h-10 px-4 bg-white text-black rounded-full flex justify-center items-center gap-2">
                    <input type="checkbox" hidden onChange={(e: React.ChangeEvent) => changeHandle(e)} />
                    <p>{props.value}</p>
                </label>
            }
        </>
    )
}