import axios from 'axios';

const fetchAI21Response = async (prompt:any) => {
  const apiKey = 'mCijfPiE7aQxnwASS0XpaPhLTzsbGOSO';  // Replace with your actual API key
  const apiUrl = 'https://api.ai21.com/studio/v1/j1-large/complete';

  try {
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      maxTokens: 150
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
};

export default fetchAI21Response;
