import React, { useState } from 'react';

const Speech = ({ setUserResponse }) => {
  const [isListening, setIsListening] = useState(false);

  const startSpeechRecognition = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.start();

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setUserResponse(speechToText); // Pass the result back to Question.js
      };
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div>
      <button
        onClick={startSpeechRecognition}
        className="px-6 py-2 bg-green-500 text-white rounded-lg"
      >
        {isListening ? 'Listening...' : 'Start Speech Recognition'}
      </button>
    </div>
  );
};

export default Speech;
