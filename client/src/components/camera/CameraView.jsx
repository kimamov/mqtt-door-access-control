import React, { useRef, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import JSMpeg from '@cycjimmy/jsmpeg-player'
//const JSMpeg = React.lazy(() => import('@cycjimmy/jsmpeg-player'));

const CameraView = ({ cameraAdress = "" }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref || !ref.current) return;
        /* new JSMpeg.VideoElement(
            ref.current, 
            `ws://${window.location.host}:2000/api/stream/${encodeURIComponent(
                'rtsp://admin:admin@meierscloud.synology.me:8001')}`
        ) */
        new JSMpeg.VideoElement(
            ref.current,
            `ws://${window.location.host}:2000/api/customstream?cam=${cameraAdress}}`
        )
        /* new JSMpeg.VideoElement(
            ref.current,
            `ws://${window.location.host}:2000/api/customstream?cam=${cameraAdress})}`
        ) */

    }, [])

    return (
        <Box width={500} height={300} ref={ref}>
        </Box>
    )
}

export default CameraView
