'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.sass'
import { Row } from '@/ui'
import { useTheme } from '@emotion/react'
const Point = ({ data }: { data: number }) => {
    const theme = useTheme()
    const ref = useRef<HTMLDivElement>(null)
    const [point, setPoint] = useState(data)
    const timeout = useRef<any>()
    const isStart = useRef<boolean>(false)
    // const end = useRef<any>(false)
    useEffect(() => {
        if (data === 0) return
        if (isStart.current) {
            if (!ref.current) return
            ref.current.style.transform = 'scale(1.1)'
            setTimeout(() => {
                if (!ref.current) return
                ref.current.style.transform = 'scale(1)'
            }, 200)
        }
        isStart.current = true
        timeout.current = setInterval(() => {
            setPoint(point => {
                if (point >= data) {
                    clearInterval(timeout.current)
                    return data
                }
                return point + (data / 50)
            })
        }, 20)
        return () => {
            clearInterval(timeout.current)
        }
    }, [data])
    return (
        <Row ref={ref} className={styles.point} sx={{ color: theme?.color?.primary }}>
            <i className="fas fa-gift"></i>
            <span>{point.toLocaleString()} คะแนน</span>
        </Row>
    )
}
export default Point