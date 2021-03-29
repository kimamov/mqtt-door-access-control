import React, { useRef, useLayoutEffect } from 'react'

import JSMpeg from '@cycjimmy/jsmpeg-player'
//const JSMpeg = React.lazy(() => import('@cycjimmy/jsmpeg-player'));

const CameraView = ({ cameraAdress = "", heightPercent = 0.5625 }) => {
    const ref = useRef(null);

    useLayoutEffect(() => {
        if (!ref || !ref.current) return;

        new JSMpeg.VideoElement(
            ref.current,
            `ws://${window.location.host}:2000/api/customstream?cam=${cameraAdress}`,
            { autoSetWrapperSize: true }
        )


    }, [])

    return (
        <div style={{ width: "100%" }} ref={ref}>

        </div>

    )
}

export default CameraView
