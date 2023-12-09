import React, { ReactElement, useState } from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import AccessDenied from "../src/components/access_denied"
import AddInput from "../src/components/add_input"
import Capsule from "../src/components/capsule"
import Header from "../src/components/header"
import Home from "../src/components/home"
import Login from "../src/components/login"
import Menu from "../src/components/menu"
import Mystamp from "../src/components/mystamp"

const capsule = [
    {
        "name": "ちぃかわ",
        "image": "/chii.jpg"
    }
]

const [activeItem, setActiveItem] = useState("")

setActiveItem("home")
describe("Sample", () => {
    it("コンポーネントのレンダリングのテスト", async () => {
        render(
            <>
                <AccessDenied />
                <AddInput capsule={capsule} />
                <Capsule capsule={capsule} />
                <Header />
                <Home capsule={capsule} />
                <Login setActiveItem={setActiveItem} />
                <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
                <Mystamp capsule={capsule} />
            </>
        );
    });
});
