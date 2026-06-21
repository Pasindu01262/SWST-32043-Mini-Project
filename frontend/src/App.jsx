import { useState, useEffect } from 'react'


function App() {
  const [message, setMessage] = useState("Loading backend status...");

  useEffect(() => {
    fetch('http://localhost:5000/api/status')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((error) => setMessage("Backend connection failed! "));
  }, []);

  return (
    <div className="App">
      <h1>University Course Registration Portal</h1>
      <div className="card">
        <h3>System Status:</h3>
        <p style={{ color: message.includes('failed') ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      </div>
    </div>
  )
}

export default App
