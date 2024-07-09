'use client'
import React, { UIEvent, useEffect, useMemo } from 'react'
import NavBar from '@/components/NavBar'
import { useModule, useScroll, useUi } from '@/hooks'
import Background from '@/components/Background'
import Loading from '@/widgets/Loading'
import { Notify } from '@/widgets/Notify'
import { ThemeProvider as EmotionThemeProvider, CacheProvider, CSSObject } from '@emotion/react'
import createCache from '@emotion/cache'
import { Float } from '@/widgets/Float'
import { useRecoilState } from 'recoil'
import { scrollState } from '@/recoil/atoms/app'
import Splash from '@/widgets/Splash'
import { useParams } from 'next/navigation'
import Alert from '@/widgets/Alert'
declare module '@emotion/react' {
    export interface Theme {
        color: {
            primary: string
            secondary: string
        },
        components?: {
            Button?: {
                variants?: {
                    primary?: CSSObject,
                    secondary?: CSSObject
                }
            }
        }
    }
}
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { page } = useParams()
    const { data: ui } = useUi()
    const [_, setScroll] = useScroll();

    const theme = useMemo(() => ({
        color: {
            primary: ui?.config?.colors?.[0] ?? '#555',
            secondary: ui?.config?.colors?.[1] ?? '#777',
        },
        components: {
            Button: {
                variants: {
                    primary: {
                        backgroundColor: ui?.config?.colors?.[0],
                        color: '#FFF',
                        width: '100%',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '10px 0',
                        fontSize: '1.2em',
                    }
                }
            }
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
                <Alert />
                <Notify />
                <Float />
                <div id='page' className="app">
                    <Background config={ui?.config} />
                    <div onScroll={onScroll} className="page">
                        {children}
                    </div>
                    {!ui?.config?.pages?.[page?.[0]]?.hideNavbar && <NavBar />}
                </div>
            </EmotionThemeProvider>
        </CacheProvider>
    )
}

export default ThemeProvider