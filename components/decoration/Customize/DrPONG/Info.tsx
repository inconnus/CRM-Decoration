'use client'
import React from 'react'
import { Box, Column, Image, Padding, Row, Text } from '@/ui';
import { addDashes } from '@/lib';
const Info = (params: any) => {
    return (
        <Padding padding='15px'>
            <Row sx={{ gap: '10px', backgroundColor: '#FFF', borderRadius: '15px', padding: '15px' }}>
                <Image sx={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} src={params?.line?.pictureUrl ?? '/images/default_img.svg'} />
                <Column >
                    <Row >
                        <Text sx={{ fontSize: '28px', color: '#4d4d4d', fontWeight: 'bold', marginTop: '-5px' }}>{params?.member?.userInfo?.phoneNumber ? addDashes(params?.member?.userInfo?.phoneNumber) : '0XX-XXX-XXXX'}</Text>
                        {params?.member?.moduleInfo?.tier && <Text >{params?.member?.moduleInfo?.tier}</Text>}
                    </Row>
                    <Row sx={{ gap: '5px' }}>
                        <Image sx={{ width: '20px', height: '20px' }} src={`/images/customize/DrPONG/star.svg`} />
                        <Text sx={{ fontSize: '20px', color: 'text.secondary', fontWeight: 'bold' }}>{params?.member?.moduleInfo?.point || 0} คะแนน</Text>
                    </Row>
                </Column>
            </Row>
        </Padding>
    )
}

export default Info