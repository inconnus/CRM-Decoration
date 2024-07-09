import DateScroll from './DateScroll'
import dayjs from 'dayjs'
import styles from './index.module.sass'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { DecorationParams } from '@/types/DecorationParams'
import { Column } from '@/ui'
const BirthDay = (params: DecorationParams) => {
    const { register, setValue } = useFormContext()
    const [hasChage, setHasChange] = useState(false)
    const dateScrollRef = useRef<any>()
    const [date, setDate] = useState<any>([])
    const onChange = data => {
        setValue('birthdate', `${data[2] - 543}-${String(data[1]).padStart(2, '0')}-${String(data[0]).padStart(2, '0')}`)
        if (!hasChage) setHasChange(true)
        setDate([data[0], data[1], data[2]])
    }
    const init = data => setDate([data[0], data[1], data[2]])
    return (
        <Column sx={{ width: '100%', alignItems: 'center', ...params?.styles }}>
            <input   {...register('birthdate')} type="hidden" />
            <span style={{ color: '#FFF', fontSize: '2em' }} >วันเกิด</span>
            <div className={styles.date_scroll}>
                <DateScroll ref={dateScrollRef} onInit={init} onChange={onChange} defaultValue={[5, 6, 2538]} />
                <div className={styles.info}>
                    <span >{`อายุ ${(dayjs().year() + 543) - date[2]} ปี`}</span>
                </div>
            </div>
        </Column>
    )
}

export default BirthDay