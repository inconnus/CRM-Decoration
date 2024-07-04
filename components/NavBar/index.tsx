'use client'
import React from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { Column, Icon, Row, Text } from '@/ui'
import { useTheme } from '@emotion/react'
const NavBar = () => {
    const { mid } = useParams()
    const pathName = usePathname();
    const theme = useTheme()
    const items = [
        {
            icon: 'fas fa-home',
            label: 'หน้าแรก',
            href: `/${mid}`
        },
        {
            icon: 'fas fa-tags',
            label: 'คูปอง',
            href: `/${mid}/coupon`
        },
        {
            icon: 'fas fa-store',
            label: 'ร้านค้า',
            href: `/${mid}/store`
        },
        {
            icon: 'fas fa-map',
            label: 'สาขา',
            href: `/${mid}/location`
        }
    ]
    return (
        <Row sx={{ zIndex: 999, width: '100%', boxSizing: 'border-box', justifyContent: 'space-around', backgroundColor: 'white', padding: '15px 0 10px 0', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)' }}>
            {items?.map((item, index) => (
                <Link style={{ width: '100%' }}  href={item.href} replace key={index}>
                    <Column sx={{ alignItems: 'center', justifyContent: 'center', color: pathName === item.href ? theme?.color?.secondary : '#777' }}>
                        <Icon icon={item.icon} />
                        <Text sx={{ marginTop: '2px' }}>{item.label}</Text>
                    </Column>
                </Link>
            ))}
        </Row>
    )
}

export default NavBar