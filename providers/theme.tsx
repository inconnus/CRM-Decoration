'use client'
import React, { UIEvent, useEffect, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import { useModule, useScroll, useUi } from '@/hooks'
import Background from '@/components/Background'
import Loading from '@/widgets/Loading'
import { Notify } from '@/widgets/Notify'
import { ThemeProvider as EmotionThemeProvider, CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { Float } from '@/widgets/Float'
import { useRecoilState } from 'recoil'
import { scrollState } from '@/recoil/atoms/app'
import Splash from '@/widgets/Splash'
declare module '@emotion/react' {
    export interface Theme {
        color: {
            primary: string
            secondary: string
        }
    }
}
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: ui } = useUi()
    const [_, setScroll] = useScroll();

    const theme = useMemo(() => ({
        color: {
            primary: ui?.config?.colors?.[0] ?? 'red',
            secondary: ui?.config?.colors?.[1] ?? '#777',
        }
    }), [ui])
    const myCache = useMemo(() => createCache({
        key: 'dataslot',
    }), [])
    const onScroll = (e: UIEvent<HTMLDivElement>) => {
        setScroll?.(Math.round(e.currentTarget.scrollTop))
    }
    return (
        <CacheProvider value={myCache}>
            <EmotionThemeProvider theme={theme}>
                <Splash />
                <Loading />
                <Notify />
                <Float />
                <div id='page' className="app">
                    <Background config={ui?.config} />
                    <div onScroll={onScroll} className="page">
                        {children}
                    </div>
                    <NavBar />
                </div>
            </EmotionThemeProvider>
        </CacheProvider>
    )
}

export default ThemeProvider