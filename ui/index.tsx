'use client'
import React, { forwardRef, HTMLAttributes, InputHTMLAttributes } from 'react'
import { CSSObject, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

interface UIProps { sx?: CSSObject }

const _Button = styled.button<UIProps>(props => ({ border: 'none', ...props?.sx }))

export const Box = styled.div<UIProps>(props => ({ display: 'flex', ...props?.sx }))

export const Center = styled.div<UIProps>(props => ({ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', ...props?.sx }))

export const Grid = styled.div<UIProps>(props => ({ display: 'grid', ...props?.sx }))

export const Row = styled.div<UIProps>(props => ({ display: 'flex', ...props?.sx }))

export const Column = styled.div<UIProps>(props => ({ display: 'flex', flexDirection: 'column', ...props?.sx }))

export const Text = styled.p<UIProps & { maxLine?: number }>(props => ({ ...(props?.maxLine ? { display: '-webkit-box', WebkitLineClamp: props?.maxLine, WebkitBoxOrient: 'vertical', overflow: 'hidden' } : {}), ...props?.sx }))

export const Input = styled.input<UIProps>(props => props?.sx)

export const Image = styled.img<UIProps>(props => props?.sx)

export const Padding = styled.div<UIProps & { padding: string }>(({ padding, ...props }) => ({ padding, display: 'flex', flexDirection: 'column', ...props?.sx }))

export const Button = ({ sx, ...props }: UIProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <_Button type='button' sx={sx} {...props} />
}

export const Icon: React.FC<React.HTMLAttributes<HTMLElement> & UIProps & { icon: string }> = ({ icon, sx, ...props }) => {
    return (
        <Row sx={{ justifyContent: 'center', alignItems: 'center', ...sx }} {...props}>
            <i className={icon} />
        </Row>
    )
}
export const TextField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & UIProps & { icon?: string }>(({ icon, sx, ...props }, ref) => {
    return (
        <Row sx={{ flex: '1 1', backgroundColor: '#FFF', borderRadius: '20px', border: '1px solid rgba(0,0,0,.102)', overflow: 'hidden', alignItems: 'center', ...sx }}>
            {icon && <Icon sx={{ position: 'absolute', marginLeft: '15px', fontSize: '16px', color: '#777', pointerEvents: 'none' }} icon='fa-regular fa-magnifying-glass' />}
            <Input ref={ref} sx={{ color: '#333', border: 'none', height: '35px', width: '100%', outline: 'none', padding: `0 15px 0 ${icon ? '40px' : '15px'}` }} {...props} />
        </Row>
    )
})

export const IconButton = ({ icon, onClick }: { icon: string, onClick?: () => void }) => {
    const theme = useTheme()
    return (
        <Button onClick={onClick} sx={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', width: '35px', height: '35px', borderRadius: '25px', padding: '5px', flexShrink: 0, ":active": { transform: "scale(0.98)" } }}>
            <Icon sx={{ color: theme?.color?.primary }} icon={icon} />
        </Button>
    )
}