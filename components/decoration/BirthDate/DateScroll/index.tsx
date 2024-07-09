'use client'
import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'
import styles from './DateScroll.module.sass'
import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/th';
dayjs.extend(localeData)
dayjs.locale('th')
const DateScroll = ({ onChange, onInit, defaultValue = [15, 6, 2538] }, ref) => {
    const [dayData, setDayData] = useState<number[]>([])
    const [data, setData] = useState<any[]>([[], []])
    const dataRef = useRef<any[]>([])
    const scrollRef = useRef<any[]>([])
    const isScrollRef = useRef<boolean>(false)
    useImperativeHandle(ref, () => ({
        set: (date) => {
            scrollRef.current[0].scrollTop = 35 * (date[0] - 1)
            scrollRef.current[1].scrollTop = 35 * (date[1] - 1)
            scrollRef.current[2].scrollTop = 35 * data[1].indexOf(date[2])
            dataRef.current = date
        }
    }));
    useEffect(() => {
        console.log(defaultValue);
        
        const year = [...([...Array(79)].map((_, index) => ((dayjs().year() - 12) + 543) - index)).reverse()]
        setDayData([...Array(dayjs(`${defaultValue[2] - 543}-${defaultValue[1]}`, "YYYY-MM").daysInMonth())].map((_, index) => index + 1))
        setData([[...dayjs.months()], year])
    }, [])
    useEffect(() => {
        if (!data[1].length) return
        scrollRef.current[0].scrollTop = 35 * (defaultValue[0] - 1)
        scrollRef.current[1].scrollTop = 35 * (defaultValue[1] - 1)
        scrollRef.current[2].scrollTop = 35 * data[1].indexOf(2538)
        dataRef.current = defaultValue
        onInit(dataRef.current)
    }, [data])
    const onScroll = (index, e) => {
        const value = Math.round(e.currentTarget.scrollTop / 35)
        if (index === 0) {
            if (dataRef.current[0] === dayData[value]) return
            dataRef.current[0] = dayData[value]
        }
        else {
            if (index === 1) {
                if (dataRef.current[index] === value + 1) return
                dataRef.current[index] = value + 1
            }
            else {
                if (dataRef.current[index] === data[index - 1][value]) return
                dataRef.current[index] = data[index - 1][value]
            }
            const day = [...Array(dayjs(`${dataRef.current[2] - 543}-${dataRef.current[1]}`, "YYYY-MM").daysInMonth())].map((_, index) => index + 1)
            setDayData(day)
        }
        onChange(dataRef.current)
    }
    return (
        <div className={styles.container}>
            {/* <div className={styles.mask} /> */}
            <div className={styles.border} />
            {[dayData, data[0], data[1]].map((item, index) => (
                // @ts-ignore
                <div key={index.toString()} ref={e => scrollRef.current[index] = e} onScroll={e => onScroll(index, e)} className={styles.item}>
                    {[...Array(4), ...item, ...Array(4)].map((number, index) => (
                        <div key={index} className={styles.text}>{number}</div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default forwardRef(DateScroll);
