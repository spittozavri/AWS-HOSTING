import { useEffect, useState } from 'react';

function App() {
  const [answer, setAnswer] = useState('Loading...');

  useEffect(() => {
    fetch('http://localhost:3001/api/get-answer') // Change to deployed backend URL
      .then(res => res.json())
      .then(data => {
        setAnswer(data.data);
      })
      .catch(() => {
        setAnswer('Error loading data');
      });
  }, []);

  return (
    <div>
      <h1>Latest Answer:</h1>
      <span id="answer">{answer}</span>
    </div>
  );
}

export default App;
