import Header from "@/components/header"
import CategoryForm from "@/components/category_form"
import CapsuleForm from "@/components/capsule_form"
import Confirm from "@/components/capsule_confirm"

import React, { useEffect, useState } from "react"

type Props = {
    setActiveItem: React.Dispatch<React.SetStateAction<string>>
}

export default function Form(props: Props) {
    const [activeItem, setActiveItem] = useState<string>("category")
    const [category, setCategory] = useState<Object>({})
    const [capsules, setCapsules] = useState<Object>([])

    useEffect(() => {
        if(activeItem === 'complete'){
            props.setActiveItem('admin')
        }
    }, [props, activeItem])

    return (
        <>
            {activeItem === 'category' && <CategoryForm setActiveItem={setActiveItem} setCategory={setCategory} category={category} /> }
            {activeItem === 'capsule' && <CapsuleForm setActiveItem={setActiveItem} setCapsules={setCapsules} category={category} capsules={capsules} /> }
            {activeItem === 'confirm' && <Confirm setActiveItem={setActiveItem} category={category} capsules={capsules} />}
        </>
    )
}