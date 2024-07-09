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
import Checklist from './Checklist'
import Policy from './Policy'
import Button from './Button'

import { useTheme } from '@emotion/react'
import Tab from './Tab'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import { decorationContextState } from '@/recoil/atoms/app'
import ProductTable from './ProductTable'
import { Column, Spacer } from '@/ui'
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import SubPage from './SubPage'
import OTP from './OTP'
import Gender from './Gender'
import BirthDay from './BirthDate'
const ComponentMapData: any = { Migrate, Card, Info, Tier, Image, Coupon, Products, Video, Carousel, Text, Branch, StoreHeader, Tab, ProductTable, Spacer, Checklist, Policy, Button, SubPage, OTP, Gender, BirthDay }

export const Components = ({ name, params, method }: { name: string, params: any, method?: any }) => {
    const { mid } = useParams()
    const { data: member } = useMember()
    const [line] = useLine()
    const theme = useTheme()
    const form = useFormContext()
    const Component = ComponentMapData[name]
    return Component ? <Component {...params} mid={mid} member={member} line={line} theme={theme} form={form} method={method} /> : null
}

const ComponentMap = () => {
    const methods = useForm()
    const { page } = useParams()
    const currentPage = page?.[0] || 'home'
    const { data: ui } = useUi()

    return (
        <FormProvider {...methods}>
            <Column sx={{ ...ui?.config?.pages?.[currentPage]?.styles }} className="page_content">
                {ui?.config?.pages?.[currentPage]?.header && <Headers />}
                {ui?.config?.pages?.[currentPage]?.contents?.map((item: any) => (
                    <Components key={item?.id} name={item?.type} params={item?.params} />
                ))}
            </Column>
        </FormProvider>

    )
}

export default ComponentMap