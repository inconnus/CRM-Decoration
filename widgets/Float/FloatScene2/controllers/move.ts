import { TouchEvent, TransitionEvent, useCallback, useEffect, useRef, useState } from "react"
const map = (value: number, x1: number, y1: number, x2: number, y2: number) => (value - x1) * (y2 - x2) / (y1 - x1) + x2
const moveController = ({ onFloatClose }: { onFloatClose: () => void }) => {
    const [active, setActive] = useState<boolean>(false)
    const [overlay, setOverlay] = useState(true)
    const touchStart = useRef<number>(0)
    const isEnd = useRef<boolean>(false)
    const isStart = useRef<boolean>(false)
    const timeRef = useRef<number>(0)
    const height = useRef<number>(0)
    const isScrolling = useRef<boolean>(false)
    const isNext = useRef<boolean>(false)
    const isScroll = useRef<boolean>(true)
    const pageRef = useRef<HTMLElement | null>()
    const overlayRef = useRef<HTMLElement | null>()
    const containerRef = useRef<any | null>()
    const bgRef = useRef<any | null>()
    useEffect(() => {
        // if(!pageRef.current) return
        pageRef.current = document.getElementById('page')
        overlayRef.current = document.getElementById('overlay_float')
        addEventListener('scroll', () => {
            isScrolling.current = true
        }, true)
    }, [])
    useEffect(() => {
        if (!overlayRef.current || !pageRef.current) return
        if (overlayRef.current.childElementCount === 1) {
            pageRef.current.style.willChange = 'transform'
            pageRef.current.style.transform = 'scale(0.95)'
            pageRef.current.style.borderRadius = '8px'
        }
    }, [active])
    const clearPageRef = useCallback(() => {
        if (!overlayRef.current || !pageRef.current) return
        if (overlayRef.current.childElementCount === 1) {
            pageRef.current.style.transform = ''
            pageRef.current.style.borderRadius = ''
            pageRef.current.style.willChange = ''
        }
    }, [])
    const onClose = useCallback(() => {
        clearPageRef()
        isStart.current = true
        setOverlay(false)
    }, [])
    const aimateEnd = useCallback((e: any) => {
      
        
        if (!e.animationName.startsWith('Float_end')) return
        if (!overlay) {
            if (pageRef?.current) pageRef.current.style.willChange = ''
            if (onFloatClose) onFloatClose()
        }
        if (isStart.current) {
           
            isStart.current = false
            setActive(false)
            setOverlay(true)
        }
    }, [overlay])
    const end = useCallback((e: TouchEvent<HTMLDivElement>) => {
        if (!overlayRef.current || !pageRef.current || !containerRef.current || !bgRef.current) return
        isScrolling.current = false
        isStart.current = false
        containerRef.current.style.willChange = ''
        bgRef.current.style.willChange = ''
        containerRef.current.style.transition = 'transform 0.3s'
        if (overlayRef.current.childElementCount === 1) pageRef.current.style.transition = 'all 0.3s'
        bgRef.current.style.transition = 'opacity 0.3s'
        if (e.changedTouches[0].clientY - touchStart.current > (containerRef.current.getClientRects()[0].height / 2)) {
            clearPageRef()
            containerRef.current.style.transform = `translateY(100%)`
            bgRef.current.style.opacity = `0`
            isEnd.current = true
        }
        else {
            const speed = (e.changedTouches[0].clientY - touchStart.current) / (+new Date() - timeRef.current)
            if (speed > 0.5) {
                isEnd.current = true
                containerRef.current.style.transform = `translateY(${100}%)`
                bgRef.current.style.opacity = `0`
                clearPageRef()
            }
            else {

                isEnd.current = false
                containerRef.current.style.transform = `translateY(0)`
                bgRef.current.style.opacity = `1`
                if (overlayRef.current.childElementCount === 1) {
                    pageRef.current.style.transform = 'scale(0.95)'
                    pageRef.current.style.borderRadius = '8px'
                }
            }
        }
    }, [])
    const move = useCallback((e: TouchEvent<HTMLDivElement>) => {
        if (!overlayRef.current || !pageRef.current || !containerRef.current || !bgRef.current) return
        if (!isStart.current) {
            if (!isScroll.current) return
            isStart.current = true
            touchStart.current = e.touches[0].clientY
            timeRef.current = +new Date()
            height.current = containerRef.current.getClientRects()[0].height

            bgRef.current.style.transition = 'none'
            containerRef.current.style.transition = 'none'
            if (pageRef?.current) pageRef.current.style.transition = 'none'
            containerRef.current.style.willChange = 'transform'
            bgRef.current.style.willChange = 'transform'
            // isStart.current = false
            return
        }

        const pos = e.touches[0].clientY - touchStart.current
        if (!isScroll.current) return

        const percent = (100 / height.current * pos)
        bgRef.current.style.opacity = `${1 - (percent / 100)}`
        if (overlayRef.current.childElementCount === 1) {
            pageRef.current.style.transform = `scale(${0.95 + map(percent, 0, 100, 0, 0.05)})`
            pageRef.current.style.borderRadius = `${8 - map(percent, 0, 100, 0, 8)}px`
        }
        if (pos < 0) return
       
        
        containerRef.current.style.transform = `translateY(${pos}px)`
    }, [])
    const tranEnd = useCallback((e: TransitionEvent<HTMLDivElement>) => {
        if (isEnd.current) {
            isStart.current = false
            setActive(false)
            setOverlay(true)
            isNext.current = false
            touchStart.current = 0
            isEnd.current = false
            timeRef.current = 0
            height.current = 0
            isScroll.current = true
            isScrolling.current = false
            // setActive(false)
            if (pageRef?.current) pageRef.current.style.willChange = ''
            if (onFloatClose) onFloatClose()
        }
    }, [])

    return { onClose, aimateEnd, end, move, tranEnd, containerRef, bgRef, overlay, active, setActive, isNext, isScroll }

}
export default moveController