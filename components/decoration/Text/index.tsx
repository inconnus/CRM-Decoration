import React from 'react'
import styles from './index.module.sass'
const Text = (params) => {
    return (
        <div className={`${styles.container} ${params?.type === 'full' ? styles.full : null}`}>
            <div className={styles.text} >{params?.content}</div>
        </div>
    )
}

export default Text