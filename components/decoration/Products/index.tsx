import React, { useCallback, useMemo } from 'react'
import styles from './index.module.sass'
import Link from 'next/link';
import useSWRImmutable from 'swr/immutable'
import { toLocale } from '@/lib';

const Products = (params) => {
    const allProducts = useMemo(() => Object.values(params?.content || {})?.flatMap((item: any) => item?.contents).map(item => `id = ${item?.id}`), [params?.content])
    const { data: productsInfo, mutate } = useSWRImmutable(params?.mid && allProducts?.length > 0 ? `https://search.inventory.dataslot.app/indexes/inventories${process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? '' : '-dev'}/search#poduct_com` : null, url => fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 912f796999a84eb1b71758a5b72f4a36c0235f085c4b4a774f8925b4194a772e"
        },
        body: JSON.stringify({
            "q": "",
            "limit": 999,
            "filter": [
                `company = ${params?.mid}`,
                allProducts
            ]
        }),
    }).then(item => item.json()).then(item => item?.hits))
    const product = useCallback((id) => productsInfo?.find(i => i?.id === id), [productsInfo])
    return (
        <div className={styles.main_content}>
            <div className={styles.main_title}>
                <span>{params?.title}</span>
            </div>
            <div className={styles.contents}>
                {params?.content?.[params?.member?.moduleInfo?.tier ?? '']?.contents?.map((item, index) => (
                    <Link href={`/${params?.mid}/store/${item.id}`}>
                        <div className={styles.item}>
                            <img loading="lazy" src={product(item?.id)?.coverImage || '/images/SVG/default_img.svg'} />
                            <div className={styles.content}>
                                <span className={styles.title}>{product(item?.id)?.name}</span>
                                {item?.price && <div style={{ alignItems: 'center' }}>
                                    <span className={styles.price}>฿{toLocale(item?.price)}</span>
                                    <span className={`${styles.price} ${styles.original}`}>฿{toLocale(product(item?.id)?.price ?? 0)}</span>
                                </div>}
                                {item?.point && <span className={styles.point}>{toLocale(item?.point, 0)} คะแนน</span>}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Products