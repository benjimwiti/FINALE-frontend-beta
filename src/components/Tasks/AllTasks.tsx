import React, { useEffect } from 'react';
import { useGetTasksQuery } from '../../app/api/apiSlice';
import { RootState } from '../../app/store/store';
import { useSelector } from 'react-redux';
import TaskItem from './Task';

const AllTasks: React.FC = () => {
  const { data: tasks, isLoading } = useGetTasksQuery(); // Fetch tasks using RTK Query
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    
  }, []);

  if (isLoading) return <div>Loading...</div>; // Handle loading state

  

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      {/* {tasks && tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}          
        />
      ))}
      {!tasks && <div>No tasks found.</div>}  */}
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
      <TaskItem/>
    </div>
  );
};

export default AllTasks;
