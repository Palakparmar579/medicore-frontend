import React from 'react'
import { Outlet } from 'react-router-dom'
import PatientSlidebar from '../component/patient/Slidebar'
function PatientLayout() {
  return (
    <div>
        <div className='flex'>
            <PatientSlidebar/>
            <div className='flex pl-6'>
               <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default PatientLayout
