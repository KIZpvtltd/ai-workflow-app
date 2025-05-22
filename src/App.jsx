import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      if (data.message) {
        setResponse(data.message);
      } else {
        setResponse('No response received from AI.');
      }
    } catch (err) {
      console.error(err);
      setResponse('Error contacting the server.');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h1>AI Workflow App</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="60"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: '100%', padding: 10 }}
        />
        <br />
        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: '10px 20px' }}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: 20, backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8 }}>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
