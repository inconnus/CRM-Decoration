import { DecorationParams } from '@/types/DecorationParams'
import { Column, Icon, Row, Text } from '@/ui'
import React from 'react'

const Checklist = (params: DecorationParams) => {
    return (
        <Column sx={{ alignItems: 'center' }}>
            <Column >
                {params?.contents.map((item, index) => <Row key={index} sx={{ alignItems: 'center', gap: '10px' }}>
                    <Icon icon='fas fa-check-circle' sx={{ color: '#FFF' }} />
                    <Text>{item}</Text>
                </Row>)}
            </Column>
        </Column>
    )
}

export default Checklist