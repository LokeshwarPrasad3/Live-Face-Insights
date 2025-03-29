import React from 'react';
import CameraErrorImage from '../../assets/images/camera-error.png';

const CameraDeniedError = ({ error }) => {
  // Retry camera access if permission was denied
  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setError(null); // Clear error on success
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      if (
        err.name === 'NotAllowedError' ||
        err.name === 'PermissionDeniedError'
      ) {
        setError(
          'Please allow camera permissions in your browser settings and try again.'
        );
      } else {
        setError(
          'Unable to access webcam. Please ensure your camera is connected and try again.'
        );
      }
    }
  };

  return (
    <div className="error_container mb-3 px-2 flex flex-col gap-2 h-full w-full justify-center items-center">
      <img
        className="flex-1 min-h-0 max-h-[400px]"
        src={CameraErrorImage}
        alt="Camera Error"
      />
      <p className="text-red-500 font-semibold">{error}</p>
      <a
        href=""
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-4 py-1.5 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-700 transition duration-300 mt-1"
      >
        Retry Camera Access
      </a>
    </div>
  );
};

export default CameraDeniedError;
