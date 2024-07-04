'use client'
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.sass'
// import { useModule, useSWRScrollMeili } from '@/hooks'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Icon, TextField, Row } from '@/ui'
const SearchBar = () => {
    const [filter, setFilter] = useState('')
    const [filterTimer, setFilterTimer] = useState<NodeJS.Timeout>()
    const { mid } = useParams()
    // const { swr: { data: rawFilteredData, isValidating: isFilteredValidating, mutate } } = useSWRScrollMeili({
    //     url: filter ? `https://search.inventory.dataslot.app/indexes/inventories${process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? '' : '-dev'}/search` : null,
    //     params: {
    //         "q": filter,
    //         "limit": 20,
    //         "filter": [
    //             `company = ${mid}`,
    //             `status = NORMAL`,
    //             `price > 0`,
    //             `available > 0`,
    //             `isOnStore = true`,
    //             [`stock EXISTS AND stock.${config?.config?.warehouse?.code}.available > 0`],
    //         ]
    //     }
    // })
    const rawFilteredData:any = []
    const filteredData = useMemo(() => rawFilteredData && rawFilteredData.flatMap((item:any) => item), [rawFilteredData])
    // console.log(filteredData, filter);
    const inputRef = useRef<HTMLInputElement>(null)
    const [active, setActive] = useState(false)
    const [preActive, setPreActive] = useState(true)
    const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        clearTimeout(filterTimer)
        setFilterTimer(setTimeout(() => {
            setFilter(text)
            // console.log('mu');


        }, 50))
    }
    const onBack = () => {
        setActive(false)
        setFilter('')
    }


    return (
        <>
            <Icon icon='fa-solid fa-chevron-left' onClick={onBack} sx={{ position: 'absolute', left: '10px', padding: '10px 0', width: '25px', opacity: active ? 1 : 0, transition: 'opacity 0.2s', color: '#555', pointerEvents: active ? 'auto' : 'none' }} />
            <TextField ref={inputRef} sx={{ flex: active ? '1 0 calc(100% - 25px)' : '1 1 100%', marginLeft: active ? '25px' : '0', transition: 'all 0.2s' }} onFocus={() => setActive(true)} icon='fa-regular fa-magnifying-glass' value={filter} onChange={onFilter} placeholder='ค้นหาสินค้า'  />
            {/* {active && <div onAnimationEnd={onBlur} className={`${styles.content} ${preActive ? styles.active : styles.deactive}`}>
                {filteredData?.map(item => (
                    <Link key={item?.id} href={`/${mid}/store/${item?.id}`} >
                        <div className={styles.item}>
                            <img className={styles.cover} src={item?.coverImage || '/images/SVG/default_img.svg'} />
                            {item?.name}
                        </div>
                    </Link>
                ))}
            </div>} */}
        </>
    )
}

export default SearchBar