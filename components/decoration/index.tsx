'use client'
import React, { useEffect } from 'react'
import { useMember, useLine, useUi } from '@/hooks'
import { useParams, useSearchParams } from 'next/navigation'
import Headers from '@/components/decoration/Header'

import Info from './Customize/DrPONG/Info'
import Tier from './Customize/DrPONG/Tier'
import Card from './Card'
import Migrate from './Customize/DrPONG/Migrate'
import Image from './Image'
import Coupon from './Coupon'
import Products from './Products'
import Video from './Video'
import Carousel from './Carousel'
import Text from './Text'
import Branch from './Branch'
import StoreHeader from './StoreHeader'
import { useTheme } from '@emotion/react'
import Tab from './Tab'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { decorationContextState } from '@/recoil/atoms/app'
import ProductTable from './ProductTable'

const ComponentMapData: any = { Migrate, Card, Info, Tier, Image, Coupon, Products, Video, Carousel, Text, Branch, StoreHeader, Tab, ProductTable }
const Components = ({ name, context, params }: { name: string, context: [any, SetterOrUpdater<any>], params: any }) => {
    const { mid } = useParams()
    const { data: member } = useMember()
    const [line] = useLine()
    const theme = useTheme()
    const Component = ComponentMapData[name]
    return Component ? <Component {...params} mid={mid} member={member} line={line} theme={theme} context={context} /> : null
}

const ComponentMap = () => {
    const { page } = useParams()
    const context = useRecoilState<any>(decorationContextState)
    const { data: ui } = useUi()
    return (
        <>
            {ui?.config?.pages?.[page?.toString() || 'home']?.header && <Headers />}
            {ui?.config?.pages?.[page?.toString() || 'home']?.contents?.map((item: any) => (
                <Components key={item?.id}  context={context} name={item?.type} params={item?.params} />
            ))}
        </>

    )
}

export default ComponentMap