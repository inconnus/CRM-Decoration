import React, { useContext, useEffect, useRef, useState } from 'react'
import Checkbox from '@/ui/Checkbox'
import styles from './index.module.sass'
import Privacy from '@/components/Privacy'
import { DecorationParams } from '@/types/DecorationParams'
import { Row } from '@/ui'
const Policy = (params: DecorationParams) => {
    const chRef = useRef<any>()
    const [accept, setAccept] = useState(false)
    const onAccept = () => {
        float.close()
        chRef.current.check(true)
        setAccept(true)
    }
    useEffect(() => {
        params.form.setValue('policy', accept)
    }, [accept])
    return (
        <Row className={styles.privacy}>
            <Checkbox ref={chRef} onChange={setAccept} />
            <span>ฉันตกลงและยอมรับ <span onClick={() => { float.push({ title: 'ข้อกำหนดและเงื่อนไขในการใช้งาน', name: 'privacy', component: <Privacy onAccept={onAccept} /> }) }} style={{ textDecoration: 'underline' }}>ข้อกำหนดและเงื่อนไขในการใช้งาน และยอมรับนโยบายความเป็นส่วนตัว</span></span>
        </Row>
    )
}

export default Policy