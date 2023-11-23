'use client'

import Header from "@/components/header"
import Menu from "@/components/menu"
import Home from "@/components/home"
import Profile from "@/components/profile"
import Search from "@/components/search"
import { useState } from "react"

export default function App() {
  const [activeItem, setActiveItem] = useState("home")
  const capsule = [
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
    { 'name': 'ちぃかわ', 'image': '/chii.jpg' },
  ]

  return (
    <div className="w-screen h-screen flex-col justify-end px-7">
      <Header />
      {activeItem === "home" && <Home capsule={capsule} />}

      {activeItem === "profile" && <Profile capsule={capsule} />}

      {activeItem === "search" && <Search capsule={capsule} />}

      <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
    </div>
  )
}
