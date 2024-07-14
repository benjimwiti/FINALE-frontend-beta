import React from 'react'
import Sidebar from '../components/Common/SideBar'
import AllTasks from '../components/Tasks/Notify'
import AIChat from '../components/Common/AIChat'
import Footer from '../components/Common/Footer'
import Navbar from '../components/Common/Navbar'

const Notification: React.FC = () => {
  return (
    <div className='content'>
    <div className='flex h-screen'>
      <Footer />
      <Navbar/>
    <Sidebar />
    <div className='flex-1 p-4'>
    <h1 className="text-2xl font-bold mb-4">These tasks are almost due</h1>
      <AllTasks/>
      <AIChat/>
    </div>
    
    </div>
    </div>
  )
}

export default Notification