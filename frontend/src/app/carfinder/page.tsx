"use client";
import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface Message {
  sender: "user" | "agent";
  text: string;
}

const CarFinderPage: React.FC = () => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [conversation, setConversation] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <span className="text-red-500 font-semibold text-lg">Your browser doesn&apos;t support speech recognition.</span>;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      sendMessage(transcript.trim());
      resetTranscript();
    }
  };

  const sendMessage = async (message: string) => {
    setConversation((prev) => [...prev, { sender: "user", text: message }]);
    setIsSending(true);
    try {
      const response = await fetch("http://localhost:8000/agent_chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error("Error calling API");

      const data = await response.json();
      setConversation((prev) => [...prev, { sender: "agent", text: data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setConversation((prev) => [...prev, { sender: "agent", text: "There was an error processing your request." }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-6">
      {/* Header */}
      <header className="w-full max-w-4xl text-center py-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Find Your Dream Car with AI
        </h1>
        <p className="text-lg text-gray-300 mt-2">Speak to our assistant and get recommendations instantly</p>
      </header>

      {/* Chat Box */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-4 backdrop-blur-xl bg-opacity-60 border border-gray-700">
        <div className="h-80 overflow-y-auto space-y-4 px-2">
          {conversation.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">Start a conversation...</p>
          ) : (
            conversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-lg shadow-md text-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200"
                  }`}
                >
                  <p>
                    <span className="font-semibold">{msg.sender === "user" ? "You:" : "AI:"}</span> {msg.text}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Voice Control Panel */}
      <div className="mt-6 flex flex-col items-center space-y-4">
        {/* Transcript */}
        <div className={`text-lg text-gray-300 bg-gray-800 px-6 py-3 rounded-lg border border-gray-700 w-full max-w-2xl text-center ${listening ? "ring-2 ring-blue-500" : ""}`}>
          {listening ? transcript || "Listening..." : "Your transcript will appear here..."}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={startListening}
            disabled={listening || isSending}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-5 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Start listening"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18c-1.1 0-2-.9-2-2H7a1 1 0 01-1-1V9a1 1 0 011-1h1V6a4 4 0 018 0v2h1a1 1 0 011 1v6a1 1 0 01-1 1h-1c0 1.1-.9 2-2 2h-4z" />
            </svg>
          </button>
          <button
            onClick={stopListening}
            disabled={!listening || isSending}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-5 shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Stop listening"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 018 8v3.5a1 1 0 01-1 1H5a1 1 0 01-1-1V10a8 8 0 018-8zm0 2a6 6 0 00-6 6v3h12v-3a6 6 0 00-6-6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarFinderPage;
