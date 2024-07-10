// src/pages/EditTask.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTaskByIdQuery, useUpdateTaskMutation } from '../app/api/apiSlice';
import Sidebar from '../components/Common/SideBar';

const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { data: task, isLoading: isLoadingTask } = useGetTaskByIdQuery(taskId!);
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [label, setLabel] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setLabel(task.label);
      setDueDate(new Date(task.dueDate).toISOString().split('T')[0]);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      try {
        const updatedTask = {
          title,
          description,
          label,
          dueDate: new Date(dueDate),
        };

        await updateTask({ id: task._id, task: updatedTask }).unwrap();
        navigate('/');
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  if (isLoadingTask) return <div>Loading...</div>;

  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 p-4'>
        <div>Edit Task</div>
        <form onSubmit={handleSubmit} className='mt-4'>
          <div className='mb-4'>
            <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              type='text'
              id='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              rows={4}
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='label' className='block text-sm font-medium text-gray-700'>
              Label
            </label>
            <input
              type='text'
              id='label'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='dueDate' className='block text-sm font-medium text-gray-700'>
              Due Date
            </label>
            <input
              type='date'
              id='dueDate'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              required
            />
          </div>
          <button
            type='submit'
            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
              isUpdating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
