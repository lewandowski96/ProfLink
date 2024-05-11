import React, { useState } from 'react'
import { DialogContent } from '@mui/material'
import Cropper from 'react-easy-crop'

export default function CropEasy({ photoUrl }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixel, setCroppedAreaPixel] = useState(null)

    const cropComplete = (croppedArea, croppedAreaPixel) => {
        setCroppedAreaPixel(croppedAreaPixel)
    }






    return (
        <div>
            <DialogContent deviders sx={{
                background: "#333",
                position: "relative",
                height: 400,
                width: "auto",
                minWidth: { sm: 500 }
            }}>
                <Cropper
                    image={photoUrl}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />

            </DialogContent>
            <DialogActions>
                <Box>
                    
                </Box>
                </DialogActions>
        </div>
    )
}
