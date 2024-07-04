import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Padding, Image as ImageUI } from '@/ui'
import { useRecoilState } from 'recoil'
import { } from '@/recoil'
const IMG = ({ params }) => {
    return (
        <ImageUI sx={{ width: '100%', borderRadius: params?.type === 'full' ? '0' : '15px', transition: 'border-radius 0.3s' }} style={{ ...params?.styles }} src={params?.content || '/images/default_img.svg'} />
    )
}
const Image = (params) => {
    const { mid } = useParams()
    const generateUrl = useCallback(() => {
        switch (params?.navigator?.type) {
            case 'product':
                return `/${mid}/store/${params?.navigator?.href}`
            case 'custom':
                return params?.navigator?.href
            default:
                return ``
        }
    }, [mid, params])

    return (
        <Padding padding={params?.type === 'full' ? '0' : '8px 16px'} sx={{ transition: 'padding 0.2s' }}>
            {generateUrl() ?
                <Link href={generateUrl()}  >
                    <IMG params={params} />
                </Link> : <IMG params={params} />}
        </Padding>

    )
}

export default Image