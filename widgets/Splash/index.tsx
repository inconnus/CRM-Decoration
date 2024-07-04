'use client'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import styles from './Splash.module.sass'
import { useConfig, useReady } from '@/hooks'
export const Splash = () => {
    const params = useParams()
    const [ready] = useReady()
    const { data: config } = useConfig()
    const [active, setActive] = useState(true)
    const end = () => {
        setActive(false)
    }
    // console.log(config);

    return (
        active ? <div onTransitionEnd={end} className={`${styles.loader} ${ready ? styles.ready : ''}`}>
            {params.mid && <img className={styles.logo} src={`/s3/images/${params.mid}/crm-images/logo`} />}
            {Object.keys(config ?? {})?.length > 0 && (config?.config?.ui?.components?.Splash?.description ?
                <div className={styles['preload-footer']}>Powered by {config?.config?.ui?.components?.Splash?.description}</div> :
                <div className={styles['preload-footer']}>Powered by <img src='/images/dataslot.svg' /> Dataslot</div>
            )}

        </div> : null
    )
}
export default Splash