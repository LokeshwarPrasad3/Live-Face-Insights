// Import necessary React hooks and face-api.js library
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import CameraErrorImage from "../assets/images/camera-error.png";

// Define background colors for each emotion bar
const emotionGradients = {
  happy: 'bg-gradient-to-br from-yellow-400 to-yellow-300',
  neutral: 'bg-gradient-to-br from-gray-400 to-gray-600',
  sad: 'bg-gradient-to-br from-blue-500 to-blue-700',
  angry: 'bg-gradient-to-br from-red-500 to-red-700',
  fearful: 'bg-gradient-to-br from-purple-600 to-purple-800',
  disgusted: 'bg-gradient-to-br from-green-700 to-green-800',
  surprised: 'bg-gradient-to-br from-pink-400 to-purple-400',
};

const FaceDetection = () => {
  // Refs for video and canvas elements
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // States for detected data
  const [expressions, setExpressions] = useState({});
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [error, setError] = useState(null); // To handle camera or model errors

  useEffect(() => {
    // Function to load face-api models
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models/tiny_face_detector');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models/face_expression');
        await faceapi.nets.ageGenderNet.loadFromUri('/models/age_gender_model');
      } catch (err) {
        console.error('Error loading models:', err);
        setError('Failed to load face detection models.');
      }
    };

    // Function to start the webcam stream
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setError('Unable to access webcam. Please ensure your camera is connected and permissions are granted.');
      }
    };

    // Function to detect faces and analyze expressions
    const detectFaces = async () => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        // Wait until video metadata is loaded (video size)
        video.onloadedmetadata = () => {
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          // Set dimensions of video and canvas
          video.width = videoWidth;
          video.height = videoHeight;
          canvas.width = videoWidth;
          canvas.height = videoHeight;

          // Match canvas with video size
          const displaySize = { width: videoWidth, height: videoHeight };
          faceapi.matchDimensions(canvas, displaySize);

          // Detect faces and expressions every 100ms
          setInterval(async () => {
            const detections = await faceapi
              .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
              .withFaceLandmarks()
              .withFaceExpressions()
              .withAgeAndGender(); // Also get age and gender info

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            // Clear canvas for redrawing
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            // Draw detection results on the canvas
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

            // Update state with first face's expressions, age and gender
            if (detections.length > 0) {
              setExpressions(detections[0].expressions);
              setAge(Math.round(detections[0].age)); // Round age to nearest number
              setGender(detections[0].gender);
            }
          }, 100);
        };
      }
    };

    // Load models, then start webcam and detection
    loadModels().then(() => {
      startVideo().then(() => {
        detectFaces();
      });
    });
  }, []);

  // Retry camera access if permission was denied
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setError(null); // Clear error on success
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError("Please allow camera permissions in your browser settings and try again.");
      } else {
        setError("Unable to access webcam. Please ensure your camera is connected and try again.");
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      {/* If there is a camera error, show this */}
      {error ? (
        <div className="error_container mb-3 px-2 flex flex-col gap-2 justify-center items-center">
          <img src={CameraErrorImage} alt="Camera Error" />
          <p className="text-red-500 font-semibold">{error}</p>
          <button
            onClick={requestCameraAccess}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-4 py-1.5 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 mt-1"
          >
            Retry Camera Access
          </button>
        </div>
      ) : (
        <>
          {/* Video feed from webcam */}
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ width: '640px', height: '480px', objectFit: 'cover' }}
          />

          {/* Canvas overlays for face detection and expressions */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              height: '480px',
            }}
          />

          {/* Display detected age and gender */}
          <div>
            <p className="text-base font-bold text-center mt-1 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Estimate Age: {age}
            </p>
            <p className="text-base font-bold text-center bg-gradient-to-r from-blue-600 to-teal-400 text-transparent bg-clip-text">
              Your Gender: {gender}
            </p>
            <h2 className="text-base font-bold text-center mt-1 bg-gradient-to-r from-pink-500 to-orange-400 text-transparent bg-clip-text">
              Emotion Status:
            </h2>
          </div>
        </>
      )}

      {/* Emotion graph (vertical bars for each expression) */}
      <div className="graph_container flex justify-center items-center w-full border-b border-blue-600">
        <div className="main_expression_vertical_container flex gap-1.5 justify-end items-end max-w-fit h-[115px]">
          {Object.entries(expressions).map(([emotion, emotionValue]) => {
            const lowerEmotion = emotion.toLowerCase();
            const gradientClass = emotionGradients[lowerEmotion] || 'bg-gray-300';

            return (
              <div
                key={emotion}
                className="individual_status_container text-center flex flex-col items-center"
              >
                {/* Emotion label */}
                <span className="text-[10px] font-medium capitalize block mb-1">
                  {emotion}
                </span>

                {/* Height of bar is based on confidence of that emotion */}
                <div
                  style={{ height: `${100 * emotionValue}px` }}
                  className={`status w-12 rounded-t transition-all duration-200 ease-in ${gradientClass}`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FaceDetection;
