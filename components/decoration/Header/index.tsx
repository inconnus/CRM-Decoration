'use client'
import { useParams } from 'next/navigation'
import SearchBar from '@/components/SearchBar'
import NotifyMessage from '@/components/NotifyMessage'
import { Icon, Row,IconButton } from '@/ui'
import { useTheme } from '@emotion/react'
import { useRecoilState } from 'recoil'
import { scrollState } from '@/recoil/atoms/app'
import { useScroll } from '@/hooks'
// import Cart from '../Cart'
// import History from '../History'

const Header = () => {
    // const { cart: [cart, setCart] } = useApp()
    const { page } = useParams()
    const currentPage = String(page ?? 'home')
    // const { ui } = useModule()
    // const { scroll } = usePage()
    const [scroll] = useScroll()

    const cart = []

    return (
        <Row style={{
            background: `rgba(255,255,255,${(scroll / 100)})`,
            boxShadow: `0 2px 2px 1px rgba(0,0,0,${Math.min(0.076, scroll / 100)})`,
        }}
            sx={{
                gap: '15px',
                position: 'sticky',
                flexShrink: 0,
                top: 0,
                height: '55px',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 15px',
                overflow: 'hidden',
                zIndex: 999
            }}>
            <SearchBar />
            <IconButton onClick={() => float.push({ name: 'cart', title: 'การแจ้งเตือน', component: <NotifyMessage /> })} icon='far fa-bell' />
            <IconButton icon='fas fa-history' />
            <IconButton icon='fa-regular fa-basket-shopping-simple' />
        </Row>
    )
}

export default Header
