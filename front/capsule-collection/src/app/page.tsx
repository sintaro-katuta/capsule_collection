'use client'

import Header from "@/components/header"
import Menu from "@/components/menu"
import Home from "@/components/home"
import { useState } from "react"

export default function App() {
  const [activeItem, setActiveItem] = useState("home")
  const capsule = [
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
    { 'name': 'ちぃかわ', 'image': '/chii.svg' },
  ]

  return (
    <div className="w-screen h-screen flex-col justify-end px-7">
      <Header />
      {activeItem === "home"
        ?
        <Home capsule={capsule} />
        :
        null}
      {activeItem === "profile" ? <div className="h-body"></div> : null}
      {activeItem === "search" ? <div className="h-body"></div> : null}
      <Menu activeItem={activeItem} setActiveItem={setActiveItem} />
    </div>
  )
}
