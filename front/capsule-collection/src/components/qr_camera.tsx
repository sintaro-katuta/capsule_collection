import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import jsQR from 'jsqr'
import axios from 'axios'
import { supabase } from '@/supabase/client'
import StampAnimation from '@/components/stamp_animation'

export default function Qr_Camera(props: any){
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [contentWidth, setContentWidth] = useState<number>(720)
    const [contentHeight, setContentHeight] = useState<number>(1280)

    const [cameraSwitch, setCameraSwitch] = React.useState<string>("")

    const [capsule, setCapsule] = useState<any[]>([])

    const cancel = (e: React.FormEvent) => {
        e.preventDefault();
        props.setActiveItem("home");
    };

    useEffect(() => {
        const config = { audio:false, video: { facingMode: "environment" }}
        const ctx = canvasRef.current?.getContext('2d')
        const canvasUpdate = () => {
            if (ctx && videoRef.current && canvasRef.current) {
                canvasRef.current.width = contentWidth
                canvasRef.current.height = contentHeight
                ctx.drawImage(videoRef.current, 0, 0, contentWidth, contentHeight)
                requestAnimationFrame(canvasUpdate)
            }
        }
        const checkImage = async() => {
            if(ctx && videoRef.current){
                ctx?.drawImage(videoRef.current, 0, 0, contentWidth, contentHeight)
                const imageData = ctx.getImageData(0, 0, contentWidth, contentHeight)
                if (imageData) {
                    const code = jsQR(imageData.data, contentWidth, contentHeight)
                    if (code) {
                        if(code.data !== "https://*" || "http://"){
                            setCameraSwitch("hidden")
                            console.log(props.uid)
                            const res = await axios.post('/api/capsule/select', { id: code.data })
                            setCapsule(res.data.capsule)
                            const auth: any = supabase.auth;
                            const { data: { user }} = await auth.getUser();
                            const userCapsuleRes = await axios.post('/api/userCapsule/create', { userId: user.id, capsuleId: res.data.capsule[0].id})
                            console.log(userCapsuleRes)
                        }
                    }
                }
                setTimeout(()=>{ checkImage() }, 200);
            }
        }
    
        navigator.mediaDevices.getUserMedia(config)
        .then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.onloadedmetadata = () => {
                    if (videoRef.current){
                        videoRef.current.play()
                        console.log(videoRef.current.clientWidth, videoRef.current.clientHeight)
                        setContentWidth(videoRef.current.clientWidth)
                        setContentHeight(videoRef.current.clientHeight)
                        canvasUpdate()
                        checkImage()
                    }
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    },[contentWidth, contentHeight, props.uid])

    return(
        <>
            <Image
                src="/cancel.svg"
                width={35}
                height={35}
                alt=""
                onClick={(e: React.FormEvent) => cancel(e)}
            />
            <video ref={videoRef} autoPlay playsInline width={contentWidth} height={contentHeight} className={`flex justify-center ${cameraSwitch}`}></video>
            <canvas ref={canvasRef} className='hidden'></canvas>
            {capsule.length !== 0 &&
                <>
                    {capsule.map((cp: any, i: number) => (
                        <StampAnimation
                            key={i}
                            capsule={cp}
                            setActiveItem={props.setActiveItem}
                        />
                    ))}
                </>
            }                
        </>
    )
}