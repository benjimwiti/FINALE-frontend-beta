import React, { useState, useEffect } from 'react';
import { AiOutlineMessage } from 'react-icons/ai'; // Import the icon from react-icons library or any other icon library
/* import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
 */


const ChatIcon: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [query, setQuery] = useState('');
  //@ts-ignore
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<{ query: string; response: string }[]>([]);

  /* const currentUser: any  = useSelector((state: RootState) => state.auth.user);
  const tasks: any  = useSelector((state: RootState) => state.tasks.tasks); */

  useEffect(() => {
    // Load chat history from localStorage when component mounts
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []); // Empty dependency array ensures this effect runs only once, on mount

  const toggleChat = () => {
    setShowChat((prev) => !prev);
  };

  const handleQuerySubmit = () => {
    if (!query.trim()) {
      return; // Do not submit empty queries
    }

    // Simulate AI response with dummy data
    const dummyResponse = `Dummy response to "${query}"`;
    const newHistoryItem = { query, response: dummyResponse };
    const newHistory = [...history, newHistoryItem];

    // Update state and localStorage with new history
    setHistory(newHistory);
    localStorage.setItem('chatHistory', JSON.stringify(newHistory));

    setResponse(dummyResponse);
    setQuery(''); // Clear the query input after submitting
  };

  const isSendDisabled = query.trim().length === 0; // Disable send button if query is empty

  return (
    <div >
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
                <div className="text-right pr-4"> {/* Adjusted margin to the right */}
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
