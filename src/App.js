import React, { useState } from 'react';
import './App.css';

function App() {
    const [character, setCharacter] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ character, message }),
        });
        const data = await response.json();
        setResponse(data.message);
    };
    
    return (
        <div className="App">
        <h1>{character} ChatApp</h1>
        <p>Enter a character and a message, and the server will respond with a message that the character would say.</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="character">Character: </label>
                <input
                type="text"
                id="character"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="message">Message: </label>
                <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        {response && <div>{character && <b>{character}: </b>}{response}</div>}
        </div>
    );
}

export default App;