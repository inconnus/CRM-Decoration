import React from 'react'
import styles from './index.module.sass'
import { Center, Icon } from '@/ui'
import { useTheme } from '@emotion/react'
const NotifyMessage = () => {
    const theme = useTheme()
    return (
        <Center sx={{ width: '100%', height: '100%' }}>
            <Icon sx={{ fontSize: '3em', color: theme?.color?.primary, marginBottom: '10px' }} icon={'far fa-bell'} />
            ไม่มีการแจ้งเตือน
        </Center>
    )
}

export default NotifyMessage