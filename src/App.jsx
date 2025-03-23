import React from 'react';
import FaceDetection from './components/FaceDetection';
import { FaGithub } from "react-icons/fa";

function App() {
  return (
    <div className="container mx-auto flex flex-col gap-3 mt-3">
      <div className='heading_part flex justify-center items-center gap-3' >
        <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">Face Expression Detector</h1>
        <a href="https://github.com/LokeshwarPrasad3"><FaGithub className='h-7 w-7' /></a>
      </div>
      <FaceDetection />
    </div>
  );
}

export default App;
