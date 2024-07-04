import {  useCallback, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.module.sass'

interface Notify {
    push: (label: string, style?: 'success' | 'error') => void
}
declare global {
    interface Window {
        notify: Notify
    }
    const notify: Notify
}
export const Notify = () => {
    const timeoutRef = useRef<NodeJS.Timeout>()
    const isActive = useRef(false)
    const [label, setLabel] = useState('')
    const [style, setStyle] = useState('error')
    const [active, setActive] = useState(false)
    const notifyRef = useRef<HTMLDivElement>(null)
    const open = useCallback(() => {
        setTimeout(() => {
            isActive.current = true
            if (!notifyRef.current) return
            notifyRef.current.style.transform = 'translateX(0)'
            timeoutRef.current = setTimeout(() => {
                if (!notifyRef.current) return
                notifyRef.current.style.transform = 'translateX(200%)'
                // isActive.current = false
                setTimeout(() => {
                    setActive(false)
                    isActive.current = false
                }, 400);
            }, 4000);
        }, 10);
    }, [])
    const close = useCallback(async () => {
        clearTimeout(timeoutRef.current)
        isActive.current = false
        if (!notifyRef.current) return
        notifyRef.current.style.transform = 'translateX(200%)'
        await new Promise((reslove) => {
            setTimeout(reslove, 400);
        })
    }, [])
    useEffect(() => {
        if (!active) return
        open()

    }, [active])
    const ref = useRef<any>({
        push: async (label: string, style: 'success' | 'error' = 'success') => {
            if (isActive.current) {
                await close()
                setLabel(label)
                setStyle(style)
                open()
                return
            }
            setActive(true)
            setLabel(label)
            setStyle(style)

        }
    })
    useEffect(() => {
        window.notify = ref.current
    }, [])
    return active ? ReactDOM.createPortal(
        <div ref={notifyRef} className={`${styles.notify} ${styles[style]}`}>
            <i className={`fas fa-${style === 'error' ? 'exclamation-circle' : 'check-circle'}`}></i>
            <span>{label}</span>
        </div>
        , document.body as HTMLElement) : null
}