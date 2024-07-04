'use client'
import React, { useEffect, useMemo, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { MemberTierConfig } from '@/types/MemberTierConfig'
import { toLocale } from '@/lib'
import { Box, Column, Padding, Row, Text } from '@/ui'
import { useTheme } from '@emotion/react'
const MAX = 30000
const TIER_COLOR_MAP = {
    'Extern': {
        border: '2px solid #01a99e',
        background: 'linear-gradient(to bottom, #7cc7bb 0%, #0caca0 100%)',
    },
    'Intern': {
        border: '2px solid #c9861b',
        background: 'linear-gradient(to bottom, #e8c46a 0%, #c9861b 100%)',
    },
    'Resident': {
        border: '2px solid #87818c',
        background: 'linear-gradient(to bottom, #cdcbd1 0%, #87818c 100%)',
    }

}

const TierSign = ({ amount, label }) => (
    <Column style={{ left: `${(100 / MAX) * amount}%`, position: 'absolute', alignItems: 'center',transition:'left 0.3s', transform: 'translateX(-50%)' }} >
        <Text sx={{
            color: '#FFF', padding: '0 15px', borderRadius: '6px', lineHeight: '15px', border: TIER_COLOR_MAP[label]?.border, fontSize: '18px', background: TIER_COLOR_MAP[label]?.background,
        }}>
            {label}
        </Text>
        <Box sx={{ width: '2px', height: '10px', background: '#e0e0e0' }} />
    </Column>
)
const Tier = (params) => {
    const theme = useTheme()
    const { data } = useSWRImmutable<MemberTierConfig>(params?.mid ? `/dataslot/config/${params?.mid}/MemberTier` : null)
    const tiers = useMemo(() => data?.tiers?.sort((a, b) => (a.amount ?? 0) - (b.amount ?? 0)), [data])
    const amount = useMemo(() => params?.member?.moduleInfo?.amount ?? 0, [params])

    const [progress, setProgress] = useState(20)
    useEffect(() => {
        if (amount === 0) return
        setProgress((100 / MAX) * (Math.min(Math.max(amount, 3200), MAX - 3500)))
    }, [amount])

    return (
        <Padding padding={'28px 16px 8px 16px'} >
            <Column sx={{
                backgroundColor: '#FFF',
                alignItems: 'center',
                borderRadius: '25px',
                padding: '20px',
                border: '3px solid #01a99e',
                fontSize: '20px',
                width: '100%'
            }}>
                <Text sx={{
                    position: 'absolute',
                    marginTop: '-40px',
                    fontSize: '24px',
                    color: theme?.color?.primary, fontWeight: 'bold',
                    padding: '1px 30px',
                    borderRadius: '50px',
                    textShadow: '0 0 0 #fff,-1px -1px 0 #fff,1px -1px 0 #fff,-1px 1px 0 #fff,1px 1px 0 #fff',
                    backgroundColor: '#d2e8e8',
                    boxShadow: '0 0 0 2px #fff',
                    border: '3px solid #01a99e'
                }}>
                    ระดับสมาชิก
                </Text>
                <Row sx={{ height: '28px', width: '100%', position: 'relative', marginTop: '10px' }}>
                    <TierSign amount={((tiers?.[0]?.amount ?? 0) + 3200)} label={'Extern'} />
                    <TierSign amount={(tiers?.[1]?.amount ?? 0)} label={'Intern'} />
                    <TierSign amount={((tiers?.[2]?.amount ?? 0) - 3500)} label={'Resident'} />
                </Row>
                <Box sx={{ height: '25px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '20px', padding: '3px', overflow: 'hidden' }}>
                    <Box style={{ width: `${progress}%` }} sx={{ height: '100%', borderRadius: '20px 0 0 20px', background: 'linear-gradient(180deg,#7cc7bb 0,#0caca0)', transition: 'width 0.8s' }} ></Box>
                </Box>
                <Row sx={{ justifyContent: 'space-between', width: '100%', marginTop: '15px' }}>
                    <Column>
                        <Text sx={{ fontWeight: 'bold' }}>ยอดช้อปสะสมในเดือนนี้</Text>
                        <Text>{toLocale(amount, 0)} / 15,000</Text>
                    </Column>
                    <Column sx={{ alignItems: 'flex-end' }}>
                        <Text sx={{ fontWeight: 'bold' }}>ยอดช้อปสะสมในปีนี้</Text>
                        <Text>{toLocale(amount, 0)} / 30,000</Text>
                    </Column>
                </Row>
                <Text sx={{ color: '#cbcbcb', textDecoration: 'underline' }} >กดดูเงื่อนไขการเปลี่ยนระดับ</Text>

            </Column>
        </Padding>
    )
}

export default Tier