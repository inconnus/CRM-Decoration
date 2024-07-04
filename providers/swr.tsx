'use client'
import { fetcher } from '@/lib'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

const SWRProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SWRConfig value={{ fetcher: fetcher }}>
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </SWRConfig>
    )
}

export default SWRProvider