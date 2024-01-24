import React from "react"
import { useState } from "react"
import Image from "next/image"

type Props = {
    value: string | number
    type: string
    selectCategory: string[]
    selectPrice: number[]
    setSelectCategory?: any
    setSelectPrice: any
}

export default function CheckBox(props: Props){

    const [checked, setChecked] = useState(false)

    const changeHandle = (e: any) => {
        setChecked(e.target.checked)
        if(props.type === "category"){
            const category = e.target.value
            if(e.target.checked){
                props.setSelectCategory([...props.selectCategory, category])
            }else{
                props.setSelectCategory("none")
            }
        }else if(props.type === "price"){
            const price = Number(e.target.value.replace("円", ""))
            if(e.target.checked){
                props.setSelectPrice([...props.selectPrice, price])
            }else{
                props.setSelectPrice(0)
            }
        }
    }

    return(
        <>
            {checked
                ?
                <label className="w-fit h-10 px-4 bg-white border border-button text-black rounded-full flex justify-center items-center gap-2">
                    <input type="checkbox" hidden value={props.value} onChange={(e: React.ChangeEvent) => changeHandle(e)} />
                    <p>{props.value}</p>
                </label>
                :
                <label className="w-fit h-10 px-4 bg-white border border-white text-black rounded-full flex justify-center items-center gap-2">
                    <input type="checkbox" hidden value={props.value} onChange={(e: React.ChangeEvent) => changeHandle(e)} />
                    <p>{props.value}</p>
                </label>
            }
        </>
    )
}