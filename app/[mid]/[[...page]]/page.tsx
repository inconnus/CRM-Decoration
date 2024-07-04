import ComponentMap from '@/components/decoration';

import React from 'react'

const Page = async ({ params }:any) => {
  return <div className="page_content">
    <ComponentMap />
  </div>
}

export default Page