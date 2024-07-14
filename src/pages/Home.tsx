import Sidebar from '../components/Common/SideBar.js'
import AllTasks from '../components/Tasks/DateGroup.js'
import AIChat from '../components/Common/AIChat.js'
import Footer from '../components/Common/Footer.js'
import Navbar from '../components/Common/Navbar.js'


const Home:React.FC = () => {
  return (
    <div className='content'>
    <div className='flex h-screen'>
      <Footer />
      <Navbar />
      <Sidebar />
      <div className='flex-1 p-4'>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
        <AllTasks/>
        <AIChat/>
      </div>
    
    </div>
    </div>
  )
}

export default Home