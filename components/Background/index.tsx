import React from 'react'
import styles from './index.module.sass'
import { useParams } from 'next/navigation'
const Background = ({ config }:any) => {
    
    const { page } = useParams()
    const currentPage = String(page?? 'home')
    return (
        <div style={[undefined, 'color'].includes(config?.pages?.[currentPage]?.background?.mode) ? { background: config?.pages?.[currentPage]?.background?.color } : {
            backgroundImage: `url(${config.pages?.[currentPage].background.image})`,
            backgroundSize: config.pages?.[currentPage].background.size === 'full' ? '100% 100%' : config.pages?.[currentPage].background.size,
            backgroundRepeat: config.pages?.[currentPage].background.repeat
        }}
            className={styles.background} />
    )
}

export default Background