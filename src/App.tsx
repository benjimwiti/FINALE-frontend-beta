import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { IUser } from './models/User'

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
  : <p>No users found</p>

  useEffect(()=> {
    const testCors = async () => {
      try {
        const req = await axios.get(`http://localhost:8000/user`)
        console.log(req)  
        setUserList(req.data.users)
      } catch (error) {
        console.log(`error fetching the List ${error}`)
      }
    }
    testCors()
    console.log(userList)
  },[])


  return (
    <>
      {displayList}
      <button className="refetch">
        refetch
      </button>
    </>
  )
}

export default App
