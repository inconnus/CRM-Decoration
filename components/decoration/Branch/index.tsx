'use client'
import styles from './index.module.sass'
import { AdvancedMarker, APIProvider, Map, MapCameraChangedEvent, MapCameraProps, Marker } from '@vis.gl/react-google-maps';
import { fetcher } from '@/lib';
import { Loader } from '@googlemaps/js-api-loader';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useSWRImmutable from 'swr/immutable';
import Link from 'next/link';
import liff from '@line/liff';
import { Image } from '@/ui';
import { useInitial } from '@/hooks';
const loader = new Loader({
    apiKey: "AIzaSyATyHGCjMs3QX-g1LStkIBFWhpeB8MJ6So",
    version: "weekly",
});
const Detail = ({ item }: { item: any }) => {
    const { mid } = useParams()
    return (
        <div className={styles.detail}>
            <img className={styles.image} src={`/dataslot/wfmUtils/s3/object?objectKey=${mid}/wfm-media/${item?.images?.[0]}`} />
            {/* <img className={styles.image} src={`https://dataslot-resources.s3.ap-southeast-1.amazonaws.com/DrPONG/wfm-media/${item?.images?.[0]}`} /> */}
            <div className={styles.bar}>
                <span>{item?.name}</span>
                <i onClick={() => {
                    liff.openWindow({
                        url: item?.link,
                        external: true
                    });
                }} className="fas fa-directions"></i>
            </div>
            <div className={styles.content_wraper}>

                <div className={styles.content}>
                    <span className={styles.title}>รายละเอียด</span>
                    <span>{item?.note}</span>
                </div>
                <div className={styles.content}>
                    <span className={styles.title}>ติดต่อ</span>
                    <Link href={`tel:${item?.tel}`}>
                        <span>{item?.tel}</span>
                    </Link>
                </div>
                <div className={styles.content}>
                    <span className={styles.title}>ไลน์</span>
                    <div>
                        <span>{item?.line}</span>
                        <button onClick={() => {
                            liff.openWindow({
                                url: `https://line.me/ti/p/~${item?.line}`,
                            });
                        }} className={styles.line} >
                            <img className={styles.add_line} data-v-0a0a1f80="" src="https://developers.line.biz/media/line-social-plugins/th/lineit_display_btn_03.png" />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
const Location = () => {
    const { mid } = useParams()
    const { data: branch } = useSWRImmutable(`/dataslot/config/${mid}/WFM`)
    const [currentPos, setCurrentPos] = useState<any>(null)
    const [cameraProps, setCameraProps] = useState<MapCameraProps>({
        center: { lat: 13.7245449, lng: 100.4683029 },
        zoom: 12,
    });
    const handleCameraChange = (ev: MapCameraChangedEvent) => {
        setCameraProps(ev.detail)
    }
    useInitial(async () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCameraProps({
                        center: pos,
                        zoom: 15
                    })
                    setCurrentPos(pos)
                }
            )
        }
    })
    return (
        <APIProvider apiKey={'AIzaSyATyHGCjMs3QX-g1LStkIBFWhpeB8MJ6So'}>
            <Map
                mapId={'bf51a910020fa25a'}
                style={{ width: '100%', height: '100%' }}
                {...cameraProps}
                onCameraChanged={handleCameraChange}
                mapTypeControl={false}
                streetViewControl={false}
                fullscreenControl={false}
                gestureHandling={'greedy'}
            >
                <AdvancedMarker position={currentPos}>
                    <Image alt="" src="/images/current_location.png" draggable="false" sx={{ position: 'absolute', transform: 'translate3d(-50%, -100%, 0)', left: 0, top: 0, width: 25, height: 25, userSelect: 'none', border: 0, padding: 0, margin: 0, maxWidth: 'none', opacity: 1 }} />
                </AdvancedMarker>
                {branch?.config?.branches?.map((item: any) => (
                    <AdvancedMarker
                        key={`${item?.location?.lat}-${item?.location?.lng}`}
                        position={item?.location}
                        onClick={() => float.push({ title: item?.name, name: item?.action?.data, component: <Detail item={item} /> })}
                    >
                        <Image alt="" src="/images/marker.svg" draggable="false" sx={{ position: 'absolute', transform: 'translate3d(-50%, -100%, 0)', left: 0, top: 0, width: 65, height: 65, userSelect: 'none', border: 0, padding: 0, margin: 0, maxWidth: 'none', opacity: 1 }} />
                    </AdvancedMarker>
                ))}
            </Map>
        </APIProvider>
    )
}

{/* <div id='map' /> */ }
export default Location



{/* <div
     style={{
         width: 16,
         height: 16,
         position: 'absolute',
         top: 0,
         left: 0,
         background: '#1dbe80',
         border: '2px solid #0e6443',
         borderRadius: '50%',
         transform: 'translate(-50%, -50%)'
     }}></div> */}



{/* <Marker
          position={{lat: 13.7245449, lng: 100.4683029}}
          clickable={true}
          onClick={() => alert('marker was clicked!')}
          title={'clickable google.maps.Marker'}
        /> */}