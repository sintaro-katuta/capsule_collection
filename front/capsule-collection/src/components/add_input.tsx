// カプセルを登録するコンポーネント
// コンポーネント関連
import Loading from "./loading";
import StampAnimation from "./stamp_animation";
// React関連
import React, { useState, useEffect } from "react";

import Image from "next/image";
import axios from "axios";

import { supabase } from "@/supabase/client";

type Props = {
    setActiveItem: any;
};

export default function Add_Input(props: Props) {
    // dbから取得したcategoriesを登録する
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [capsule, setCapsule] = useState<any[]>([]);
    const [addFlag, setAddFlag] = useState<boolean>(false);
    const [addCapsuleData, setAddCapsuleData] = useState<any[]>([]);
    const [selectCapsule, setSelectCapsule] = useState<boolean[]>([]);
    const [uid, setUid] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    const cancel = (e: React.FormEvent) => {
        e.preventDefault();
        props.setActiveItem("home");
    };

    const selectCategory = async (e: any) => {
        setCapsule([]);
        const res = await axios.post("/api/capsule/select", {
            id: e.target.value,
        });
        res.data.capsule.forEach(async (cp: any) => {
            const capsuleImageData = supabase.storage.from('capsule').getPublicUrl(cp.image)
            if (capsuleImageData.data) {
                const capsuleData = {
                    id: cp.id,
                    name: cp.name,
                    image: capsuleImageData.data.publicUrl,
                    price: cp.price,
                };
                setCategoryName(e.target.selectedOptions[0].text)
                setCapsule((prev) => [...prev, capsuleData]);
            }
        });
        const selectCapsuleData: boolean[] = new Array(
            res.data.capsule.length
        ).fill(false);
        setSelectCapsule(selectCapsuleData);
    };

    const onSelectCapsule = (i: number) => {
        const selectCapsuleData = [...selectCapsule];
        selectCapsuleData[i] = !selectCapsuleData[i];
        console.log(selectCapsuleData);
        setSelectCapsule(selectCapsuleData);
    };

    const addCapsule = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (selectCapsule.filter((val) => val === true).length === 0) return;
        const addCapsule = capsule.filter((val, i) => selectCapsule[i]);
        console.log(addCapsule);
        setAddCapsuleData(addCapsule);
        // addCapsule.map(async (cp: any) => {
        //     const res = await axios.post("/api/userCapsule/create", {
        //         capsuleId: cp.id,
        //         userId: uid,
        //     });
        //     console.log(res);
        // });
        setAddFlag(true);
    };
    useEffect(() => {
        const getUser = async () => {
            const auth: any = supabase.auth;
            const {
                data: { user },
            } = await auth.getUser();
            setUid(user.id);
        };
        const getCategory = async () => {
            const res = await axios.get("/api/category/select");
            setCategories(res.data.categories);
            setLoading(false);
        };
        getUser();
        getCategory();
    }, []);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {addFlag ? (
                        <>
                            {selectCapsule.map((val, i) => (
                                <StampAnimation
                                    key={i}
                                    capsule={[addCapsuleData][i]}
                                    categoryName={categoryName}
                                    capsuleLength={addCapsuleData.length}
                                    capsuleIndex={i}
                                    setActiveItem={props.setActiveItem}
                                />
                            ))}
                        </>
                    ) : (
                        <div className="h-4/5">
                            <div className="w-full h-8 flex justify-between items-center">
                                <Image
                                    src="/cancel.svg"
                                    width={35}
                                    height={35}
                                    alt=""
                                    onClick={(e: React.FormEvent) => cancel(e)}
                                />
                                <p
                                    className="w-fit bg-button p-2 py-1 rounded-full text-white font-semibold"
                                    onClick={(e: React.FormEvent) =>
                                        addCapsule(e)
                                    }
                                >
                                    追加
                                    {selectCapsule.filter((val) => val === true).length}
                                </p>
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-800"
                                    htmlFor="countries"
                                >
                                    ガチャカテゴリ
                                </label>
                                {/* 取得したカテゴリを出力 */}
                                <select
                                    id="categories"
                                    defaultValue={"default"}
                                    className="h-12 px-3 bg-background border-2 border-black text-gray-900 text-sm rounded-xl outline-none focus:ring-black focus:border-black block w-full"
                                    onChange={(e: any) => selectCategory(e)}
                                >
                                    <option value="default" disabled>
                                        カテゴリを選択してください
                                    </option>
                                    {categories.map(
                                        (category: any, i: number) => (
                                            <option
                                                key={i}
                                                className="h-full"
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            {/* 検索結果が出るところ */}
                            <div className="w-full h-full my-4 p-3 bg-headline rounded-xl grid grid-cols-3 grid-rows-3 items-center justify-center overflow-y-auto hide-scroll-bar">
                                {capsule.map((cp: any, i: number) => (
                                    <div
                                        key={i}
                                        className="w-full h-full flex flex-col items-center justify-center"
                                    >
                                        <Image
                                            src={cp.image}
                                            width={90}
                                            height={90}
                                            objectFit="contain"
                                            alt=""
                                            className={`rounded-full bg-white border-2 ${
                                                selectCapsule[i]
                                                    ? "border-button"
                                                    : "border-white"
                                            }`}
                                            onClick={(e: React.FormEvent) =>
                                                onSelectCapsule(i)
                                            }
                                        />
                                        <p className="text-sm text-white font-medium">
                                            {cp.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
