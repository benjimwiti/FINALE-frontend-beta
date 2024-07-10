import './App.css'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import All from './pages/All';
import Labels from './pages/Labels';
import Create from './pages/Create';
import Notification from './pages/NotificationPage';
import EditTask from './pages/EditTask';
function App() {
  

  return (
    <BrowserRouter>      
      <Routes>
        <Route path='/' element={<Home />} />        
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />        
        <Route path='/profile' element={<ProfilePage />} />        
        <Route path='/all' element={<All />} />        
        <Route path='/labels' element={<Labels />} />        
        <Route path='/create' element={<Create/>} />        
        <Route path='/notifications' element={<Notification/>} />        
        <Route path='/edit/:taskId' element={<EditTask/>} />        
      </Routes>
    </BrowserRouter>
  )
}

export default App
