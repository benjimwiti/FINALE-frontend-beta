import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { IUser } from './models/User'
import Login from './features/auth/Login'
import PersistAuth from './features/auth/PersistAuth'
import ImageTest from './features/images/ImageTest'
import ProfileImage from './features/images/ProfilePicRender'


function App() {
  const [userList, setUserList] = useState<Array<IUser> | []>([])

  const displayList = userList.length > 0
  ? userList.map((user) => {
    return (
        <div key={user._id} className="user-data">
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
    )
  })
  : <p> Loading...</p>

  useEffect(()=> {
    const testCors = async () => {
      try {
        const req = await axios.get(`https://gr-8-api.onrender.com/user`)
        console.log(req)  
        setUserList(req.data.users)
      } catch (error) {
        console.log(`error fetching the List ${error}`)
      }
    }
    testCors()
    console.log(userList)
  },[])

  const [flagUp, setFlagUp] = useState(false)
  function handleFlag() {
    setFlagUp(prev => !prev)
  }

const filename = 'avatar-1720800432833.jpg'

  return (
    <>
        <PersistAuth>
      {displayList}
      { false && <Login/> }
      { false && <ImageTest/> }
      { true && <ProfileImage filename={filename}/> }
      <button className="refetch" onClick={handleFlag}>
        refetch
      </button>
      </PersistAuth>
    </>
  )
}

export default App
