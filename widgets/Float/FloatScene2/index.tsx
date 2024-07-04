'use client'
import { forwardRef, useImperativeHandle, useRef, useState, useEffect, TouchEvent, useCallback } from 'react'
import styles from './Float.module.sass'
import ReactDOM from 'react-dom'
import moveController from './controllers/move'
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const Float = forwardRef(({ onBackAll, fixScroll = null, logo = null, onFloatClose, onBack, isBack, children, floatRef = null, header = true, scrollRef = null }: any, ref) => {
    const { onClose, aimateEnd, end, move, tranEnd, containerRef, bgRef, overlay, active, setActive, isNext, isScroll } = moveController({ onFloatClose })
    useEffect(() => {
        setActive(true)
    }, [])
    useImperativeHandle(ref, () => ({
        close: () => {
            isNext.current = true
            onClose()
        },
        open: () => {
            setActive(true)
        },
        back: () => {
            back()
        },
        backAll: () => backAll(),
        scroll: (active: boolean) => {
            isScroll.current = active
        }
    }))

    const backAll = useCallback(() => {
        itemRef.current[0].style.transform = 'translate3d(0,0,0)'
        itemRef.current.slice(1)?.forEach(item => item.style.transform = 'translate3d(100%,0,0)')
        // itemRef.current[children.length - 1].style.transform = 'translateX(100%)'
        setTimeout(() => {
            onBackAll()
        }, 300);
    }, [])
    const back = useCallback(() => {
        itemRef.current[children.length - 2].style.transform = 'translate3d(0,0,0)'
        itemRef.current[children.length - 1].style.transform = 'translate3d(100%,0,0)'
        setTimeout(() => {
            onBack()
        }, 300);
    }, [])
    const itemRef = useRef<HTMLDivElement[]>([])
    useEffect(() => {
        (async () => {
            await wait(10)
            const item = itemRef.current.filter(item => item)
            if (item.length <= 1) return

            item[children.length - 2].style.transform = 'translate3d(-50%,0,0)'
            item[children.length - 1].style.transform = 'translate3d(0,0,0)'
            // console.log(itemRef.current[children.length - 1]);

        })()
    }, [JSON.stringify(children)])
    // console.log(children);

    return (active && ReactDOM.createPortal(
        <div ref={floatRef} className={`${styles.container} `}>
            <div onAnimationEnd={aimateEnd} className={`${styles.page_container} ${!overlay ? styles.end : ''} ${fixScroll ? styles.fixScroll : ''}`}>
                <div ref={containerRef} onTransitionEnd={tranEnd} className={`${styles.page} `}>
                    {header && <div onTouchMove={move} onTouchEnd={end} className={styles.header}>
                        <span className={styles.title}>{children.at(-1)?.title}</span>
                        <i onClick={() => children.length > 1 && back()} style={{ marginRight: '5px' }} className={`${styles.back_btn} ${children.length > 1 ? styles.active : ''} fas fa-angle-left`} />
                        <span style={{ position: 'absolute', right: '15px' }} onClick={children.at(-1)?.action?.onClick || onClose}>{children.at(-1)?.action?.title || 'กลับ'}</span>
                    </div>}

                    <div className={styles.multi_page_container}>
                        {children?.map((item: any, index: number) => (
                            <div style={{ display: children?.length - index > 2 ? 'none' : undefined }} key={`float-item-${index}`} ref={ref => { itemRef.current[index] = ref as HTMLDivElement }} className={styles.multi_page_item}>
                                {item?.component}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div ref={bgRef} onClick={onClose} className={`${styles.bg} ${!overlay ? styles.end : ''}`} />
        </div>
        , document.getElementById('overlay_float') as HTMLElement))
})

export default Float
