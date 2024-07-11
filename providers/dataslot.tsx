'use client'
import { useInitial, useConfig, useLine, useReady } from '@/hooks'
import Cookies from 'js-cookie'
import React from 'react'
import liff from '@line/liff';
const DataslotProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: config } = useConfig()
    const [, setLine] = useLine()
    const [, setReady] = useReady()
    useInitial(async () => {
        await liff.init({ liffId: '1661500410-PRG7qjRQ' })
        if (!liff.isLoggedIn()) return liff.login()
        const _token = liff.getAccessToken()
        setLine({ ...await liff.getProfile(), token: _token })
        setReady(true)
    }, [config])
    return children
}

export default DataslotProvider