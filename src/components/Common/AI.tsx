/* ******* DONT MODIFY THIS COMPONENT ************ */
import React, { useState, useEffect } from 'react';
import { AiOutlineMessage } from 'react-icons/ai'; // Import the icon from react-icons library or any other icon library
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { createTaskSuccess, updateTaskSuccess, deleteTaskSuccess  } from '../../app/store/slices/taskSlice';
import fetchAI21Response from '../../fetchAI21Response'


const ChatIcon: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [showChat, setShowChat] = useState(false);
  const [query, setQuery] = useState('');
  // @ts-ignore
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<{ query: string; response: string }[]>([]);

  useEffect(() => {
   
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const toggleChat = () => {
    setShowChat((prev) => !prev);
  };

  const handleQuerySubmit = async () => {
    if (!query.trim()) {
      return; // Do not submit empty queries
    }
  /*
    // Simulate AI response with dummy data
    const dummyResponse = `create task`;
    const newHistoryItem = { query, response: dummyResponse };
    const newHistory = [...history, newHistoryItem];

    // Update state and localStorage with new history
    setHistory(newHistory);
    localStorage.setItem('chatHistory', JSON.stringify(newHistory));

    setResponse(dummyResponse);

    handleAiResponse(dummyResponse);
   */
    
    // Example using fetch to send query to backend API
    try {
      const response  = await fetchAI21Response(query);

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const aiResponse = response // Adjust according to your API response structure

      
      const newHistoryItem = { query, response };
      const newHistory = [...history, newHistoryItem];
      setResponse(aiResponse);
      

      // Update chat history
      setHistory(newHistory);

      // Handle task operations based on AI response
      handleAiResponse(aiResponse);
    } catch (error) {
      console.error('Error sending query to AI:', error);
    }
   
    setQuery(''); // Clear the query input after submitting
  };

  const handleAiResponse = (aiResponse: string) => {
    // Example: Parse AI response to perform task operations
    if (aiResponse.includes('create task')) {
      handleCreateTask();
    } else if (aiResponse.includes('update task')) {
      handleUpdateTask();
    } else if (aiResponse.includes('delete task')) {
      handleDeleteTask();
    }
  };

  const handleCreateTask = async () => {
    // Example of creating a task
    const newTaskData = {
      title: 'ni oin Task',
      description: 'This is a new task',
      label: 'Important',
      dueDate: '2024-07-31',
      completed: false,
      userId: currentUser?._id,
    };

    try {
      // Example using fetch to create a task via backend API
      const response = await fetch('http://localhost:8000/tasks', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskData),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const {savedTask} = await response.json(); // Assuming backend returns created task data
      // Dispatch Redux action to update tasks state locally
      dispatch(createTaskSuccess(savedTask));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async () => {
    // Example of updating a task (assuming you have a selected task to update)
    const selectedTaskId = tasks[0]._id; // Example: Get the first task id for updating

    const updatedTaskData = {
      title: 'Updated Task Title',
      description: 'Updated Task Description',
    };

    try {
      // Example using fetch to update a task via backend API
      const response = await fetch(`http://localhost:8000/tasks/task/${selectedTaskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json(); // Assuming backend returns updated task data
      // Dispatch Redux action to update tasks state locally
      dispatch(updateTaskSuccess(updatedTask));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async () => {
    // Example of deleting a task (assuming you have a selected task to delete)
    const selectedTaskId = tasks[0]._id; // Example: Get the first task id for deletion

    try {
      // Example using fetch to delete a task via backend API
      const response = await fetch(`http://localhost:8000/tasks/task/${selectedTaskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      // Dispatch Redux action to delete task from tasks state locally
      dispatch(deleteTaskSuccess(selectedTaskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const isSendDisabled = query.trim().length === 0;

  return (
    <div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        onClick={toggleChat}
      >
        <AiOutlineMessage size={24} />
      </button>
      {showChat && (
        <div className="fixed bottom-12 right-4 bg-white p-4 shadow-lg rounded-lg" style={{ width: '400px' }}>
          <div className="overflow-y-auto max-h-80">
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="text-right pr-4">
                  <p className="font-bold">You:</p>
                  <p>{item.query}</p>
                </div>
                <div className="text-left">
                  <p className="font-bold">AI:</p>
                  <p>{item.response}</p>
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter prompt"
            className="w-full border-gray-300 border-2 rounded px-2 py-1"
          />
          <button
            onClick={handleQuerySubmit}
            disabled={isSendDisabled} // Disable button when query is empty
            className={`mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ${isSendDisabled && 'opacity-50 cursor-not-allowed'}`}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatIcon;
