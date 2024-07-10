import Sidebar from '../components/Common/SideBar.js'
import AllTasks from '../components/Tasks/AllTasks.js'


const Home:React.FC = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 p-4'>
        <AllTasks/>
      </div>
    
    </div>
  )
}

export default Home