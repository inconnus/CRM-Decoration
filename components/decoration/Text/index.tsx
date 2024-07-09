import React from 'react'
import styles from './index.module.sass'
import { Padding, Text as TextUI } from '@/ui'
import { DecorationParams, } from '@/types/DecorationParams'
const Text = (params: DecorationParams) => {
    return (
        <Padding padding={params?.type === 'full' ? '0' : '8px 16px'} sx={{ transition: 'padding 0.2s' }}>
            <TextUI sx={{ whiteSpace: 'pre-wrap', textAlign: 'center' }} >{params?.content}</TextUI>
        </Padding >
    )
}

export default Text