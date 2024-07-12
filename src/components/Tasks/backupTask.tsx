import React from 'react';
import { Task } from '../../app/api/apiSlice'; 
import { useDeleteTaskMutation } from '../../app/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTrash, FaEdit, FaTag } from 'react-icons/fa';
/* import { deleteTask } from '../../app/store/slices/taskSlice'; */
import { useDispatch } from 'react-redux';
import { deleteTaskSuccess } from '../../app/store/slices/taskSlice';

export type Props = {
  task: Task;
  
};



const TaskItem: React.FC<Props>  = ({ task } ) => {
   
  
  
  const title =  task?.title ||  'Sample Task Title';
  const description = task?.description ||  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const label =  task?.label ||  'Sample Label';
  const dueDate =  task?.dueDate ? new Date(task.dueDate).toLocaleDateString() :  '2024-07-31';

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [deleteChosenTask] = useDeleteTaskMutation()

    const onEdit =()=>{
         navigate(`/edit/${task?._id}`) 
        
    }
    const onDelete =async ()=>{
         try {
          await deleteChosenTask(task?._id).unwrap()
          /* dispatch(deleteTask(task?._id)); */
          dispatch(deleteTaskSuccess(task?._id));
          
         } catch (error) {
          console.log("Failed to delete task", error)
         }
    }
  
    return (
      <div className="flex items-center p-4  px-20 mb-4 bg-gray-100 border rounded-md shadow-sm">
      <div className="flex-shrink-0 mr-10">
        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-500 rounded-full">
          <FaCheckCircle size={20} />
        </div>
      </div>
      <div className="flex-1 mr-20 ">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-semibold text-blue-600">
              {title}
            </div>
            <div className="mt-1 text-gray-700">
              {description}
            </div>
          </div>
          <div className="flex items-center text-gray-500">
            <FaTag className="mr-1" />
            {label}
          </div>
        </div>
        <div className="mt-2 text-gray-500">
          Due Date: {new Date(dueDate).toLocaleString()}
        </div>
      </div>
      <div className="flex-shrink-0 ml-20 flex items-center space-x-2">
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onEdit}
        >
          <FaEdit size={20} />
        </button>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onDelete}
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
    );
  };

export default TaskItem;
