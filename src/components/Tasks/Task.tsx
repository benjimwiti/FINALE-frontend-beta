import React, { useState } from 'react';
import { Task } from '../../app/api/apiSlice'; 
import { useDeleteTaskMutation } from '../../app/api/apiSlice';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTrash, FaEdit, FaTag } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteTaskSuccess } from '../../app/store/slices/taskSlice';
import './task.css'

export type Props = {
  task: Task;
};

const TaskItem: React.FC<Props> = ({ task }) => {
  const title = task?.title || 'Sample Task Title';
  const description = task?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const label = task?.label || 'Sample Label';
  const dueDate = task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : '2024-07-31';

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteChosenTask] = useDeleteTaskMutation();

  const [completed, setCompleted] = useState(false); // State to track task completion

  const onEdit = () => {
    navigate(`/edit/${task?._id}`); 
  }

  const onDelete = async () => {
    try {
      await deleteChosenTask(task?._id).unwrap();
      dispatch(deleteTaskSuccess(task?._id));
    } catch (error) {
      console.log("Failed to delete task", error);
    }
  }

  const toggleCompleted = () => {
    setCompleted(!completed); // Toggle completion state
  }

  return (
    <div className="relative mb-4">
      <div className="flex items-center p-4 bg-gray-100 border rounded-md shadow-sm">
        <div className="flex-shrink-0 mr-10">
          <div className={`flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer ${completed ? 'bg-blue-500' : 'bg-gray-300'}`} onClick={toggleCompleted}>
            {completed ? <FaCheckCircle size={20} /> : <FaCheckCircle size={20} className="text-gray-600" />}
          </div>
        </div>
        <div className="flex-1 mr-20">
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
    </div>
  );
};

export default TaskItem;
