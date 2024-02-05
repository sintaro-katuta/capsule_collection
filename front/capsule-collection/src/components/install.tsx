import React, { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => void;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function Install({message = "ホーム画面に追加", disabledMessage = "ホーム画面に追加済み"}) {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (e: Event) => {
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsInstallable(true);
        });
    }, []);

    const onInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }
    
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
            setDeferredPrompt(null);
            setIsInstallable(false);
        } else {
            setIsInstallable(true);
        }
    };
    return (
        <div>
            <button disabled={!isInstallable} onClick={() => onInstallClick()}>{isInstallable ? message : disabledMessage}</button>
        </div>
    )
}