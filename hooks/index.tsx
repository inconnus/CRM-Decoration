import { AppContext, ModuleContext } from "@/contexts";
import { scrollState, readyState, lineState } from "@/recoil/atoms/app";
import { Config } from "@/types/Config"
import { Member } from "@/types/Member"
import { UIConfig } from "@/types/UIConnfig"
import { useParams } from "next/navigation"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import useSWRImmutable from "swr/immutable"
import useSWRInfinite from "swr/infinite"
export const useModule = () => useContext(ModuleContext)

export const useReady = () => useRecoilState(readyState)

export const useScroll = () => useRecoilState(scrollState)

export const useLine = () => useRecoilState(lineState)

export const useUi = () => {
    const { mid } = useParams()
    return useSWRImmutable<{ config: UIConfig }>(mid ? `/dataslot/config/${mid}/MemberUI` : null)
}
export const useConfig = () => {
    const { mid } = useParams()
    return useSWRImmutable<Config>(mid ? `/dataslot/config/${mid}/Member` : null, null)
}
export const useMember = () => {
    const { mid } = useParams()
    const [line] = useLine()
    return useSWRImmutable<Member>(line?.userId && line?.token ? `/dataslot/crm/individual/${mid}/auth` : null, (url: string) => fetch(url, {
        method: 'GET',
        headers: {
            ['Authorization-Line']: `Bearer ${line?.token}`
        }
    }).then(res => res?.json().then(res => res?.data)))
}
export const useInitial = (asyncFunction: () => Promise<void>, dependencies?: any[]) => {
    useEffect(() => {
        if (dependencies && dependencies.some(dep => dep === undefined)) return
        asyncFunction();
    }, dependencies ?? []);
}
export const useIntersection = (callback?, dep?) => {
    const observeRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (callback && entries[0].isIntersecting) callback(entries[0])
        })
        if ((observeRef.current?.childNodes?.length || 0) <= 1) return

        observer?.observe(observeRef.current?.lastChild as Element)
        return () => {
            observer?.disconnect()
        }
    }, dep || [])
    return observeRef
}

export const useSWRScrollMeili = (params) => {
    const isEnd = useRef(false)
    const swrData = useSWRInfinite((index, prev) => {
        if (!params?.url) return null
        if (prev && !prev?.length) {
            isEnd.current = true
            return
        }
        return ({ ...params, body: { ...params?.body, limit: 20, offset: index * 20 } })
    }, null, {
        parallel: true,
        revalidateFirstPage: false
    })
    const data = useMemo(() => swrData?.data?.flatMap(item => item), [swrData?.data])
    const observeRef = useIntersection(() => {
        if (isEnd.current) return
        swrData.setSize(size => size + 1)
    }, [swrData.data])
    return { swr: swrData, data, observeRef }
}