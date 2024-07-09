import { DecorationParams } from '@/types/DecorationParams'
import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Padding, Row, Text } from '@/ui'
{/* <Text>{params.context[0].search}</Text> */ }
const Tab = (params: DecorationParams) => {
    const { setValue } = params.form
    const [currentTab, setCurrentTab] = useState('')
    const [noth, setNoth] = useState({ width: 0, left: 0 })
    const parantRef = useRef<HTMLDivElement>(null)
    const onSelect = (e: React.MouseEvent<HTMLButtonElement>, value: string) => {
        setValue('tab', value)
        setNoth({
            width: e.currentTarget.clientWidth,
            left: e.currentTarget.offsetLeft
        })
        setCurrentTab(value)
    }
    useEffect(() => {
        setNoth({
            width: parantRef.current?.children[0].clientWidth || 0,
            left: 0
        })
        setValue('tab', params?.contents?.[0]?.value)
    }, [])
    return (
        <Row sx={{ backgroundColor: '#FFF', position: 'relative', boxShadow: 'inset 0 -2px 0 0px #ddd', }}>
            <Row ref={parantRef} sx={{ overflowX: 'scroll', scrollbarWidth: 'none', position: 'relative' }} >
                {params?.contents?.map(item => (
                    <Button onClick={(e) => onSelect(e, item?.value)} key={item?.value} sx={{
                        flexShrink: 0,
                        color: currentTab === item?.value ? params?.theme?.color?.primary : '#666',
                        background: 'none',
                        position: 'relative',
                        padding: '10px 16px',
                        fontSize: '20px'
                    }}>{item?.label}</Button>
                ))}
                <Box style={{
                    transform: `translateX(${noth.left}px)`,
                    width: `${noth.width}px`
                }} sx={{ position: 'absolute', borderRadius: '2px', transition: 'transform 0.2s', bottom: '0', height: '2px', backgroundColor: params?.theme?.color?.primary }} />
            </Row>
        </Row>
    )
}

export default Tab