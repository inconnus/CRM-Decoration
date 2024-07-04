'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.sass'
declare global {
    interface Window {
        loading: any
    }
    const loading: any
}
export const Loading = () => {
    const loadingRef = useRef<HTMLDialogElement>(null)
    const ref = useRef((value: boolean) => {
        if (value) loadingRef.current?.showModal()
        else loadingRef.current?.close()
    })
    useEffect(() => {
        window.loading = ref.current
    }, [])

    return (
        <dialog ref={loadingRef} >
            <div className={styles.loading}>
                <div className={styles['loader']} />
            </div>
        </dialog>
    )
}
export default Loading