import React from 'react';
import FaceDetection from './components/FaceDetection';

function App() {
  return (
    <div className="container mx-auto flex flex-col gap-3 mt-3">
      <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
        Face Detection Testing
      </h1>
      <FaceDetection />
    </div>
  );
}

export default App;
