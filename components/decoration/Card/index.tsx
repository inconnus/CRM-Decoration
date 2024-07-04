'use client'
import React, {  ReactNode, useEffect,  useRef, useState } from 'react'
import QRCode from 'qrcode.react'
import Point from './Point'
import { Box, Column, Image, Padding, Row, Text } from '@/ui'

const EmptyCard = () => (
    <Box sx={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
        <Box sx={{
            content: '""',
            position: 'absolute',
            left: '-12px',
            width: '22px',
            height: '80%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.31)',
            borderRadius: '0 22px 22px 0',
        }} />
        <Box sx={{
            content: '""',
            position: 'absolute',
            right: '-12px',
            width: '22px',
            height: '80%',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.31)',
            borderRadius: '22px 0 0 22px',
        }} />
    </Box>
)

const InfoBox = ({ children, width, height, left, top, padding }: { children: ReactNode, width: string, height: string, left: string, top: string, padding: string }) => (
    <Row sx={{ position: 'absolute', backgroundColor: '#55555500', transformOrigin: 'center', alignItems: 'center', justifyContent: 'center', padding: padding, width: width, height: height, left: left, top: top, }}>
        {children}
    </Row>
)
const Card = (params: any) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [cardWidth, setCardWidth] = useState(0)
    const [flip, setFlip] = useState(false)
    const resize = () => {
        setCardWidth(cardRef.current?.clientWidth ?? 0)
    }
    useEffect(() => {
        addEventListener('resize', resize)
        return () => removeEventListener('resize', resize)
    }, [])

    return (
        <Column sx={{ position: 'relative', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <EmptyCard/>
            <Padding padding='8px 16px' >
                <Row onClick={() => setFlip(!flip)} sx={{ width: '100%', perspective: '1000px', position: 'relative' }}>
                    <Box ref={cardRef} sx={{ alignItems: 'center', transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s', transform: flip ? 'rotateX(180deg)' : 'rotateX(0deg)' }}>
                        <Box sx={{ backfaceVisibility: 'hidden', width: '100%' }}>
                            <Image onLoad={() => resize()} sx={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 3px 3px #0000002c)' }} src={`https://dataslot-resources.s3.ap-southeast-1.amazonaws.com/${params?.mid}/crm-images/member-card/front`} />
                            <Point data={params?.member?.moduleInfo?.point || 0} />
                        </Box>
                        <Row sx={{ position: 'absolute', width: '100%', backfaceVisibility: 'hidden', transform: 'rotateX(180deg)', }}>
                            <Image sx={{ width: '100%', filter: 'drop-shadow(0 3px 3px #0000002c)' }} src={`https://dataslot-resources.s3.ap-southeast-1.amazonaws.com/${params?.mid}/crm-images/member-card/back`} />
                            <InfoBox padding='3%' width='28%' height='44.8%' left='4.8%' top='34%'>
                                <QRCode width='100%' height='100%' renderAs={'svg'} value={params?.member?.moduleInfo?.qrCode || ''} />
                            </InfoBox>
                            <InfoBox padding='0%' width='28.6%' height='8.7%' left='16.2%' top='85.3%'>
                                <Text sx={{ fontSize: `${(cardWidth / 20).toFixed(2)}px` }}>{params?.member?.userInfo?.phoneNumber}</Text>
                            </InfoBox>
                            <InfoBox padding='0%' width='48.4%' height='11.1%' left='42%' top='36.7%'>
                                <Text sx={{ fontSize: `${(cardWidth / 20).toFixed(2)}px` }}>{`${params?.member?.userInfo?.firstName ?? '-'} ${params?.member?.userInfo?.lastName ?? '-'}`}</Text>
                            </InfoBox>
                            <InfoBox padding='0%' width='23.9%' height='8.6%' left='4.7%' top='14.8%'>
                                <Text sx={{ fontSize: `${(cardWidth / 20).toFixed(2)}px` }}>{`${params?.member?.moduleInfo?.cardNumber ?? '-'}`}</Text>
                            </InfoBox>
                        </Row>
                    </Box>
                </Row>
            </Padding>
            <Text sx={{ color: '#333' }}>แตะที่บัตรเพื่อดูรายละเอียด</Text>
        </Column>
    )
}

export default Card