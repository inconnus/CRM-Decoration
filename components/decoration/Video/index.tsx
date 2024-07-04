import React from 'react'
import styles from './index.module.sass'
const Video = (params) => {
    return (
        <div className={`${styles.video} ${params?.type === 'full' ? styles.full : null}`}>
            {params?.content ? <video playsInline  muted={params?.muted} controls={params?.controls} autoPlay={params?.autoPlay} loop={params?.loop} style={{ ...params?.styles }} src={params?.content || '/images/default_video.svg'} /> : <img style={{ ...params?.styles }} src={'/images/default_video.svg'} />}
        </div>
    )
}

export default Video