import React from 'react'
import { Outlet } from 'react-router-dom'
import DoctorSlidebar from '../component/doctor/Slidebar'
function DoctorLayout() {
  return (
    <div>
        <div className='flex'>
            <DoctorSlidebar/>
            <div className='flex pl-6'>
             <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DoctorLayout
