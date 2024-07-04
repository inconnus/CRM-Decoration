import { Center } from '@/ui'
import React from 'react'

const Loading = () => {
  return (
    <Center sx={{ height: '100%',zIndex:999 }}>
      <div className="loader"></div>
    </Center>
  )
}

export default Loading