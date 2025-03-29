import FaceEmotionDetection from '@/components/EmotionDetection/FaceEmotionDetection';
import CrazyLoader from '@/components/Loader/CrazyLoader';
import React, { useEffect, useState } from 'react';

const EmotionDetection = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tryCameraAccess = async () => {
      try {
        // Try to access the webcam directly
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        // If successful, you can stop loading (or continue as needed)
        if (stream) {
          // Optional: stop tracks to release the camera
          stream.getTracks().forEach((track) => track.stop());
          setIsLoading(false); // or leave loading to continue FaceDetection logic
        }
      } catch (err) {
        // No camera OR permission denied OR any issue
        console.error('Camera access error:', err);
        setIsLoading(false); // ✅ Stop loading on error
      }
    };

    tryCameraAccess();
  }, []);

  return (
    <div className="container mx-auto flex flex-col gap-3 overflow-hidden">
      {false ? (
        <CrazyLoader isLoading={isLoading} />
      ) : (
        <FaceEmotionDetection setIsLoading={setIsLoading} />
      )}
    </div>
  );
};

export default EmotionDetection;
