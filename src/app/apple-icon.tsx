import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
    return new ImageResponse(
        (
        <div
            style={{
            width: '100%',
            height: '100%',
            borderRadius: 32,
            background: 'linear-gradient(to right, #3B5FEB, #6C4CE0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: 80,
            }}
        >
            F+
        </div>
        ),
        { ...size }
    )
}