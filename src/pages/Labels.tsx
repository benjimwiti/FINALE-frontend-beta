import React from 'react'
import Sidebar from '../components/Common/SideBar'

const Labels: React.FC = () => {
  return (
    <div className='flex h-screen'>
    <Sidebar />
    <div className='flex-1 p-4'>
      <div>labels</div>
    </div>
    
    </div>
  )
}

export default Labels