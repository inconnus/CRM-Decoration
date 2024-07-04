'use client'
import React, { ChangeEvent, forwardRef, useEffect, useRef, useState, useImperativeHandle, MouseEvent, FC, ForwardRefExoticComponent } from 'react'
import { InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.sass'

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string
    check?: (value: boolean) => void
}
const Checkbox = forwardRef(({ onChange = null, defaultValue = false, name = null, ...props }: any, ref) => {
    const [state, setState] = useState(defaultValue)
    const inputRef = useRef<HTMLInputElement>()
    // const setCheck = (state) => {
    //     inputRef.current.checked = false
    // }
    useImperativeHandle(ref, () => ({
        check: (value: boolean) => {
            if (!inputRef.current) return
            inputRef.current.checked = value
            setState(value)
        }
    }))
    const change = (e: MouseEvent<HTMLLabelElement>) => {
        if (props.disabled) return
        if (!inputRef.current) return
        inputRef.current.checked = !state
        setState(!state)
        if (onChange) onChange(!state)
    }
    useEffect(() => {
        if (!inputRef.current) return
        inputRef.current.checked = defaultValue
    }, [defaultValue])
    return (
        <label onMouseDown={change} className={`${styles.checkbox} ${state ? styles.active : ''} ${props.disabled ? styles.disabled : ''}`}>
            <input {...props} ref={inputRef} name={name} defaultChecked={state} type="checkbox" />
            <i className="fas fa-check"></i>
        </label>
    )
})

export default Checkbox
