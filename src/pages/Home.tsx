import Sidebar from '../components/Common/SideBar.js'
import AllTasks from '../components/Tasks/DateGroup.js'


const Home:React.FC = () => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 p-4'>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
        <AllTasks/>
      </div>
    
    </div>
  )
}

export default Home