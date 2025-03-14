'use client'

import { useState, useEffect } from 'react'

export default function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [closed, setClosed] = useState(false)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: boolean }).MSStream
        )

        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])

    if (isStandalone) {
        return null // Don't show install button if already installed
    }
    if (closed) {
        return null
    } // Don't show install button if already closed

    return (
        <div className="alert alert-secondary text-center" role="alert">
            <h3>Install App</h3>
            <button className="btn btn-outline-light">Add to Home Screen</button>
            {isIOS && (
                <p>
                    To install this app on your iOS device, tap the share button
                    <span role="img" aria-label="share icon">
                        {' '}
                        ⎋{' '}
                    </span>
                    and then &quot;Add to Home Screen&quot;
                    <span role="img" aria-label="plus icon">
                        {' '}
                        ➕{' '}
                    </span>.
                </p>
            )}

            <button type="button" className="btn-close text-white float-end" data-bs-dismiss="alert" aria-label="Close" aria-controls='alert' onClick={() => setClosed(true)}></button>
        </div>
    )
}