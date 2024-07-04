import React, { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Box, Column, Row } from '@/ui'
import { useTheme } from '@emotion/react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
const Carousel = (params: any) => {
    const theme = useTheme()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            renderMode: 'performance',
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            dragChecked() {
                clearInterval(interval.current)
            },
            dragEnded() {
                startInterval()
            },
            loop: true,
        }
    )
    const interval = useRef<any>(null)
    const startInterval = () => {
        interval.current = setInterval(() => {
            instanceRef.current?.next()
        }, (params?.interval * 1000) || 3000)
    }

    useEffect(() => {
        clearInterval(interval.current)
        startInterval()
        return () => clearInterval(interval.current)
    }, [params])
    return (
        <>
            <Column sx={{ position: 'relative', alignItems: 'center' }}>
                <Row sx={{ flexShrink: 0 }} ref={sliderRef} className="keen-slider">
                    {params?.contents?.map((item: any, index: number) => (<img className="keen-slider__slide" src={item.content ?? '/images/default_img.svg'} key={index} />))}
                </Row>
                <Row sx={{ position: 'absolute', bottom: '15px', }}>
                    {params?.contents?.map((item: any, index: number) => (
                        <Box
                            sx={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '10px',
                                background: '#0000004d',
                                margin: '0 5px',
                                boxShadow: 'inset 0 0 2px 1px #5252524d',
                                transition: 'width 0.5s',
                                flexShrink: 0,
                            }}
                            style={currentSlide === index ? { background: theme?.color?.primary, width: '16px' } : {}} key={index}
                        />))}
                </Row>
            </Column>

        </>

    )
}

export default Carousel

