import React from 'react'
import Sidebar from '../components/Common/SideBar'
import AllTasks from '../components/Tasks/DateGroup'

const All: React.FC = () => {
  return (
    <div className='flex h-screen'>
    <Sidebar />
    <div className='flex-1 p-4'>
    <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <AllTasks/>
    </div>
    
    </div>
  )
}

export default All