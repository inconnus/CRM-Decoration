import styles from './index.module.sass'
import { useEffect, useRef, useState } from 'react'
import { api } from '@/lib'
import validator from 'validator'
import { DecorationParams } from '@/types/DecorationParams'
import { Button, Icon, TextField } from '@/ui'
const OTP = (params: DecorationParams) => {
    const [isCorrect, setCorrect] = useState(false)
    const [state, setState] = useState(0)
    const otpRef = useRef<any>()
    const otpDataRef = useRef<any>({})
    const [count, setCount] = useState(15)
    const [provider, setProvider] = useState('ThaiBulkSMS')
    const { register } = params.form



    useEffect(() => {
        if (state === 1 && count > 0) {
            setTimeout(() => {
                setCount(count - 1)
            }, 1000);
        }
    }, [count, state])
    const onChange = (e) => {
        if (validator.isMobilePhone(e.target.value, 'th-TH')) {
            setCorrect(true)
            otpDataRef.current.phone = e.target.value
        }
        else setCorrect(false)
    }
    const onOTPChange = async (e) => {
        const pin = e.target.value
        if (pin.length === (provider === 'SNS' ? 6 : 4)) {
            loading(true)
            const res = await api('/dataslot/otp/verify', {
                method: 'POST',
                headers: {
                    'x-api-key': 'mJ3Z0a5TwpaygLDqY3OBT5hzxibAWyBt58FcwnX5',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: otpDataRef.current.token,
                    pin: pin,
                    smsProvider: provider
                })
            }, 'raw')
            loading(false)
            if (res.status !== 'success') {
                notify.push('รหัสลงทะเบียนไม่ถูกต้อง', 'error')
                return
            }
            params?.method?.['next']
            e.target.blur()
        }
    }

    const phoneSubmit = async () => {
        loading(true)
        const { data } = await api(`/dataslot/crm/${params?.mid}/phoneNumber/${otpDataRef.current.phone}`)
        loading(false)
        if (!data?.moduleInfo?.line || ["", "-", null].includes(data?.moduleInfo?.line)) {
            params?.method?.['next']?.()
            return
        }
        alerts({
            title: 'ตรวจพบเบอร์ในระบบ', text: 'ไม่สามารถสมัครสมาชิกได้\nเบอร์นี้มีในระบบแล้ว', type: 'error', onConfirm: () => {
            }
        })
    }
    const retry = () => {
        if (count !== 0) return
        setProvider('SNS')
        setState(0)
        setCorrect(true)
        otpRef.current.value = ''
    }
    return (

        <div className={styles.otp}>
            <div className={`${styles.input_group} ${state === 0 ? '' : styles.hide}`}>
                <span className={styles.input_title}>กรุณาใส่เบอร์มือถือของท่าน</span>
                <div className={styles.input}>
                    <Icon sx={{ color: params?.theme?.color?.primary }} icon='fas fa-mobile-alt' />
                    <TextField sx={{ color: params?.theme?.color?.primary, padding: '2px 0' }} {...register('phoneNumber')} disabled={state !== 0} type='text' maxLength={10} inputMode="numeric" onChange={onChange} />
                </div>
                <span className={styles.detail}>{'เราจะส่งรหัสลงทะเบียนไปทางข้อความ\nเพื่อใช้ในการลงทะเบียนสมาชิก'}</span>
            </div>
            <div className={`${styles.input_group_otp} ${state === 1 ? styles.active : ''}`}>
                <span className={styles.input_title}>กรุณาใส่รหัสยืนยัน</span>
                <div className={styles.input}>
                    <i className="fas fa-key"></i>
                    <input maxLength={provider === 'SNS' ? 6 : 4} type='text' inputMode="numeric" style={{ textAlign: 'center' }} autoComplete={'off'} ref={otpRef} onChange={onOTPChange} />
                </div>
                <div onClick={retry} style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {count === 0 && <i style={{ fontSize: '0.6em', marginTop: '5px', marginRight: '5px' }} className="fas fa-redo-alt" />}
                    <span style={{ width: 'auto' }} className={styles.detail}>{'ส่งใหม่อีกครั้ง'}</span>
                    {count !== 0 && <span style={{ width: 'auto', marginLeft: '5px' }} className={styles.detail}>( {count} )</span>}
                </div>
            </div>
            {isCorrect && <Button sx={{ color: '#FFF', backgroundColor: params?.theme?.color?.secondary }} disabled={!isCorrect} onClick={phoneSubmit}>ยืนยัน</Button>}
        </div>
    )
}

export default OTP