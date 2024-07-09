import { useIntersection, useSWRScrollMeili } from '@/hooks'
import { toLocale } from '@/lib'
import { DecorationParams } from '@/types/DecorationParams'
import { Column, Grid, Image, Padding, Row, Text } from '@/ui'
import React from 'react'
const Item = ({ params, item, onClick }: { params: DecorationParams, item: any, onClick?: () => void }) => (
  <Column onClick={onClick} sx={{ backgroundColor: '#FFF', borderRadius: '5px', overflow: 'hidden' }}>
    <Image src={item?.coverImage || '/images/SVG/default_img.svg'} />
    <Padding padding='10px' sx={{ flex: 1, justifyContent: 'space-between' }}>
      <Text maxLine={2} sx={{ color: '#222' }}>{item?.name}</Text>
      <Row sx={{ gap: '5px', alignItems: 'center' }}>
        <Text sx={{ color: params?.theme?.color?.primary, fontSize: '20px' }}>{`฿${toLocale(item?.price, 0)}`}</Text>
        {item?.originalPrice > 0 && <Text sx={{ color: '#999', alignItems: 'center', display: 'flex', position: 'relative', ':after': { content: '""', position: 'absolute', width: '100%', height: '1px', backgroundColor: '#999', left: '0' } }}>{`฿${toLocale(item?.originalPrice, 0)}`}</Text>}
      </Row>
    </Padding>
  </Column>
)
const ProductTable = (params: DecorationParams) => {
  const { watch } = params.form
  const { data, observeRef } = useSWRScrollMeili({
    url: 'https://search.inventory.dataslot.app/indexes/inventories/search',
    body: {
      "q": watch('search'),
      "filter": [
        "company = DrPONG",
        "status = NORMAL",
        "price > 0",
        "available > 0",
        "isOnStore = true",
        [
          "stock EXISTS AND stock.W0001.available > 0"
        ]
      ],
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 912f796999a84eb1b71758a5b72f4a36c0235f085c4b4a774f8925b4194a772e"
    }
  })
  const onClick = (item: any) => {
    float.push({ name: 'test', title: 'สินค้า', component: <Item key={item?.id} params={params} item={item} /> })//
  }
  return (
    <Padding padding='10px' sx={{ flexShrink: '0' }}>
      <Grid ref={observeRef} sx={{ gap: '10px', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))' }} >
        {data?.map((item) => (
          <Item onClick={() => onClick(item)} key={item?.id} params={params} item={item} />
        ))}

      </Grid>
    </Padding>
  )
}

export default ProductTable