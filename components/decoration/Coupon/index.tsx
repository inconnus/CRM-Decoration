'use client'
import dayjs from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './Coupon.module.sass'
import { PREVIEW_DATA, STATUS_MAPPING, UNIT_MAPPING } from './constant'
import Checkbox from '@/ui/Checkbox'
import useSWRImmutable from 'swr/immutable'
import { Box, Column, Image, Row, Text } from '@/ui'
const Coupon = (params: any) => {
    const { data, isLoading } = params?.isPreview ? {
        data: PREVIEW_DATA,
        isLoading: false
    } : useSWRImmutable(params?.mid && params?.member?.moduleInfo?.gUId ? `/dataslot/coupons/${params?.mid}/users/${params?.member?.moduleInfo?.gUId}` : null, url => fetch(url, { method: 'GET' }).then(res => res.json()).then(item => item?.data))
    const [selected, setSelected] = useState<any>(params?.value || [])
    const onChange = (item: any, value: any) => {
        if (!params?.multiple) {
            return setSelected(value ? [item] : [])
        }
        setSelected((_selected: any) => {
            if (value) return [..._selected, item]
            return _selected.filter((i: any) => i.id !== item.id)
        })
    }
    useEffect(() => {
        params?.onChange && params?.onChange(selected)
    }, [selected])

    return (
        <Column sx={{ padding: '18px 16px', gap: '10px' }}>
            {data?.length > 0 ? data?.map((item: any, index: number) => (
                <Row key={`${item.id}-${index}`} sx={{ position: 'relative', padding: '0 10px', backgroundColor: '#FFF', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 0 3px 1px #cccccc46', border: '1px dashed #ccc', alignItems: 'center', gap: '10px' }} >
                    {/* <img src={`/s3/images/${router.query.company}/crm-images/products/COUPON-TEST/COUPON-TEST`} /> */}
                    <Image sx={{ width: '55px', height: '55px', borderRadius: '50%' }} alt='logo' src={`/s3/images/${params?.mid}/crm-images/logo`} />
                    <Box sx={{ height: '100%', borderRight: ' 1px dashed #ccc' }} />
                    <Column sx={{ padding: '10px', flex: '1' }}>
                        <Text>{item.name}</Text>
                        <Text>ส่วนลด {item?.value} {UNIT_MAPPING[item.unit]}</Text>
                        <Text sx={{ color: '#888', fontSize: '14px' }} >{item.company}</Text>

                    </Column>
                    <Text sx={{ backgroundColor: '#aeaeae', color: '#FFF', padding: '1px 15px', borderRadius: '20px' }} className={`${styles.status} ${item?.status === 'EXPIRED' ? styles.expire : styles[item.status]}`}>{STATUS_MAPPING[item.status]}</Text>
                    <Text sx={{ position: 'absolute', right: '10px', bottom: '3px', fontSize: '16px', color: '#888' }}>หมดอายุ {dayjs(item.expiryTimestamp).format('DD/MM/YY:HH:mm:ss')}</Text>
                    {params?.onChange && <div style={{ marginLeft: '10px' }}><Checkbox disabled={item?.status !== 'AVAILABLE' || (selected?.length === 1 && !params?.multiple && !selected?.map(i => i.id)?.includes(item.id))} onChange={(value) => onChange(item, value)} defaultValue={selected?.map(i => i.id)?.includes(item.id) ? true : false} /></div>}
                </Row>
            )) : <span>{isLoading ? 'กำลังโหลด..' : 'ยังไม่มีคูปอง...'}</span>}

        </Column>
    )
}

export default Coupon
