'use client'
import React, { useRef } from 'react'
import { api } from '@/lib'
import { useParams } from 'next/navigation'
import { Box, Center, Icon, TextField, Row, Text, Padding } from '@/ui'
import { useTheme } from '@emotion/react'
const Migrate = () => {
    const theme = useTheme()
    const { mid } = useParams()
    const inputRef = useRef<HTMLInputElement>(null)
    const onMigrate = async () => {
        loading(true)
        const value = inputRef.current?.value
        const { error, resDesc } = await api(`/dataslot/crm/${mid}/users/migrate`, {
            method: 'PATCH',
            body: JSON.stringify({
                orderNumber: value
            })
        })
        if (error) {
            loading(false)
            return notify.push(resDesc, 'error')
        }
        loading(false)
        notify.push('ทำรายการสำเร็จ', 'success')
        if (inputRef.current) inputRef.current.value = ''
    }
    return (
        <Padding padding={'8px 16px'} >
            <Center sx={{ backgroundColor: '#FFF', borderRadius: '15px', padding: '30px' }}>
                <Text sx={{ fontSize: '26px', color: theme?.color?.secondary, fontWeight: 'bold' }}>สะสมคะแนนเพื่อแลกส่วนลด</Text>
                <Text sx={{ fontSize: '24px' }}>ทุกการสั่งซื้อ 100 บาท ได้รับ 1 Coin </Text>
                <Row sx={{ alignItems: 'center', gap: '10px', color: theme?.color?.primary }}>
                    <Text sx={{ fontSize: '20px' }} >Order ID:</Text>
                    <TextField placeholder='หมายเลขออเดอร์' />
                    <Icon onClick={onMigrate} icon='fa-solid fa-paper-plane-top' />
                </Row>

            </Center>
        </Padding>
    )
}

export default Migrate