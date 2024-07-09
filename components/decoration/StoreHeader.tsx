
import { DecorationParams } from '@/types/DecorationParams'
import { Column, IconButton, Image, Input, Padding, Row, TextField, Text, Icon } from '@/ui'
import { useParams } from 'next/navigation'
import React, { useTransition } from 'react'

const StoreHeader = (params: DecorationParams) => {
    const { register } = params.form
    const [, startTransition] = useTransition()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            params.context[1]({ ...params.context[0], search: e.target.value })
        });
    }
    return (
        <Padding padding='16px' sx={{ backgroundColor: '#768689' }}>
            <Column sx={{ gap: '16px' }}>
                <Row sx={{ gap: '16px' }}>
                    <Image src={`/s3/images/${params.mid}/crm-images/logo`} width={54} height={54} sx={{ borderRadius: '50%', border: '2px solid #FFF' }} />
                    <Column sx={{ gap: '5px' }} >
                        <Text sx={{ color: '#FFF', lineHeight: '1', fontSize: '24px' }}>{params.mid}</Text>
                        <Row sx={{ borderRadius: '5px', overflow: 'hidden' }}>
                            <Text sx={{ color: '#FFF', fontSize: '16px', backgroundColor: '#b7251b', padding: '1px 8px' }}>{`${params.mid} Shop`}</Text>
                            <Row sx={{ backgroundColor: '#FFF', padding: '1px 8px' }}>
                                <Icon icon='fa solid fa-shield-alt' sx={{ color: '#b7251b', fontSize: '12px', marginRight: '5px' }} />
                                <Text sx={{ color: '#b7251b', fontSize: '16px', }}>ร้านค้าทางการ</Text>
                            </Row>
                        </Row>
                    </Column>
                </Row>
                <TextField {...register('search')} sx={{ 'i': { color: params?.theme?.color?.primary } }} icon='search' placeholder='ค้นหาสินค้า' />
            </Column>
        </Padding>
    )
}

export default StoreHeader