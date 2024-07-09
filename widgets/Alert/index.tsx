import React, { useMemo, useContext, useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './Alert.module.sass'


interface IAlert {
    title: string
    text: string
    type?: 'success' | 'error' | 'confirm'
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
    // close: () => Promise<void>
}
declare global {
    interface Window {
        alerts: (params: IAlert) => void
    }
    const alerts: (params: IAlert) => void
}


const Alert = () => {
    const [components, setComponents] = useState<IAlert>()

    // const data = useMemo(() => (trigger?.type ? (typeof (trigger?.type) === 'string' ?
    //     { ...template[trigger.type], type: trigger.type } : { ...template.success, ...trigger?.type }) :
    //     template.success), [trigger])
    // const onConfirm = async () => {
    //     console.log('fasda');

    //     // if (trigger.onConfirm) await trigger.onConfirm()
    //     // setTrigger()
    // }
    // const onCancel = async () => {
    //     if (trigger.onCancel) await trigger.onCancel()
    //     setTrigger()
    // }
    const onConfirm = async () => {
        setComponents(undefined)
        components?.onConfirm?.()
    }
    const onCancel = async () => {
        setComponents(undefined)
        components?.onCancel?.()
    }
    useEffect(() => {
        window.alerts = ({ title, text, onConfirm = () => { }, onCancel = () => { }, type = 'success', confirmText = 'ยืนยัน', cancelText = 'ยกเลิก' }: IAlert) => {
            setComponents({ title, text, onConfirm, onCancel, type, confirmText, cancelText })
        }
    }, [])
    return components ? ReactDOM.createPortal(
        <div className={styles.alert_container}>
            <div className={styles.wait}>
                <i className={`${styles[components?.type || 'success']} far fa-${components?.type === 'success' ? 'check' : components?.type === 'confirm' ? 'question' : 'times'}-circle`}></i>
                <span className={styles.title}>{components.title}</span>
                <span className={styles.detail}>{components.text}</span>
                {components.type === 'confirm' ? <div className={styles.buttons}>
                    <button onClick={onConfirm}>{components?.confirmText}</button>
                    <button className={styles.cancel} onClick={onCancel}>{components?.cancelText}</button>
                </div> :
                    <button onClick={onConfirm}>{components?.confirmText}</button>}

            </div>
        </div>

        , document.getElementById('overlay') as HTMLElement) : null
}
export default Alert