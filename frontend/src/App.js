import React, { useState } from 'react';
import axios from 'axios';
import { Dna } from 'react-loader-spinner';
import "./App.css"
function App() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState('shayari');
  const [keyword, setKeyword] = useState('');

   

  
  const generateContent = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get(`https://content-generator-backend-73ge.onrender.com/${type}?keyword=${keyword}`)
      console.log(response)
      setContent(response.data.result);
    } catch (error) {
      console.log(error);
      setError('An error occurred while generating content.');
    }

    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="left-section"></div>

      <div className="center-section">
        <div className="center-content">
          <h1>Content Generator</h1>

          <div className="generator-form">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Shayari">Shayari</option>
              <option value="Joke">Joke</option>
              <option value="Story">Story</option>
              <option value="Quote">Quote</option>
            </select>

            <input
              type="text"
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button onClick={generateContent}>Generate</button>
          </div>

          {isLoading && (
            <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          )}

          {error && <p className="error">{error}</p>}

          {content && <p className="content">{content}</p>}
        </div>
      </div>

      <div className="right-section"></div>
    </div>
  );
}

export default App;
