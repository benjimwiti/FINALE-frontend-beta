import React, { useEffect } from 'react';
import { useFetchUserTasksQuery } from '../../app/api/apiSlice';
import TaskItem from './Task';
import { Task } from '../../app/api/apiSlice';
import { fetchTasksSuccess } from '../../app/store/slices/taskSlice';
import { RootState } from '../../app/store/store';
import { useDispatch, useSelector } from 'react-redux';

const AllTasks: React.FC = () => {
  /*  const user = {
    "_id": "668fc7a8241da77ed01d72d5",
    "name": "John Doe",
    "email": "john.doe@example.com"
  };  */
   const user = {
    "_id": "66902a533a29c357d9c127de",
    "name": "yap",
    "email": "yap@example.com"
  }; 

  const currentUser = user;
  const dispatch = useDispatch()

  const { data: userTasks, isLoading } = useFetchUserTasksQuery(currentUser?._id);


  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    if (userTasks?.userTasks) {
      dispatch(fetchTasksSuccess(userTasks.userTasks));
    }
  }, [userTasks, dispatch]);

  /* // Optional chaining (?.) ensures safe access to userTasks
  if (isLoading || !userTasks?.userTasks) return <div>Loading...</div>;

  /* const tasks:Task[] = userTasks.userTasks; */
 
  console.log(tasks);
  

  return (
    <div>
      
      {tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
          />
        ))
      ) : (
        <div>No tasks found.</div>
      )}
    </div>
  );
};

export default AllTasks;
