import React from 'react';
import { Task } from '../../app/api/apiSlice'; 

export type Props = {
  task: Task;
  
};



const TaskItem: React.FC/* <Props> */ = (/* { task } */) => {
   
    const title = /* task?.title ||  */'Sample Task Title';
    const description = /* task?.description ||  */'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const label = /* task?.label || */ 'Sample Label';
    const dueDate = /* task?.dueDate ? new Date(task.dueDate).toLocaleDateString() :  */'2024-07-31';
    
    const onEdit =()=>{
        
    }
    const onDelete =()=>{

    }
  
    return (
      <div className="border border-gray-300 rounded-md p-4 mb-4">
        <div>
          <strong>Title:</strong> {title}
        </div>
        <div>
          <strong>Description:</strong> {description}
        </div>
        <div>
          <strong>Label:</strong> {label}
        </div>
        <div>
          <strong>Due Date:</strong> {dueDate}
        </div>
        <div className="mt-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

export default TaskItem;
