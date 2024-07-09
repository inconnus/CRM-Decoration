import { DecorationParams } from '@/types/DecorationParams'
import { Button as ButtonUI } from '@/ui'
import React from 'react'

const Button = (params: DecorationParams) => {
    const enabled = params?.disabled?.every(item => params.form?.watch(item))
    return (
        <ButtonUI disabled={params?.disabled ? !enabled : false} onClick={params?.method?.[params?.onClick]} variant={params?.variant} sx={params?.styles}>{params?.label}</ButtonUI>
    )
}

export default Button