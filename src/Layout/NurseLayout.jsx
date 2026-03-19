import React from 'react'
import NurseSlidebar from '../component/nurse/Slidebar'
import { Outlet } from 'react-router-dom'
function NurseLayout() {
  return (
    <div>
        <div className='flex'>
            <NurseSlidebar/>
            <div className='flex pl-6'>
             <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default NurseLayout
