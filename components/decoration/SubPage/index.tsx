import { DecorationParams } from '@/types/DecorationParams'
import { Column, Row } from '@/ui'
import React, { useState } from 'react'
import { Components } from '..'
const IS_DEV = process.env.NEXT_PUBLIC_VERCEL_ENV === 'development'
const Debug = ({ method, page, length }) => {
    return (
        <Row sx={{ justifyContent: 'space-between', position: 'absolute', width: '100%', zIndex: 1 }} >
            {page > 0 ? <button onClick={method['back']}>{'<'}</button> : <div />}
            {page < length - 1 ? <button onClick={method['next']}>{'>'}</button> : <div />}
        </Row>
    )
}
const SubPage = (params: DecorationParams) => {
    const [page, setPage] = useState(0)
    const method = {
        next: () => setPage(page + 1),
        back: () => setPage(page - 1)
    }
    return (
        <>
            {IS_DEV && <Debug method={method} page={page} length={params?.contents?.length} />}
            <Row style={{ transform: `translate3d(-${page * 100}%,0,0)` }} sx={{ height: '100%', width: '100%', position: 'absolute', left: '0', top: '0', transition: 'transform 0.4s' }} >
                {params?.contents?.map(item => (
                    <Column key={item?.id} sx={{ height: '100%', width: '100%', flexShrink: '0', alignItems: 'center', ...item?.styles }}>
                        {item?.contents?.map(component => <Components key={component?.id} name={component?.type} method={method} params={component?.params} />)}
                    </Column>
                ))}
            </Row>
        </>
    )
}

export default SubPage